import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory Database for Bookings & Job Cards
interface Booking {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  carBrand: string;
  carModel: string;
  fuelType: string;
  vehicleNumber: string;
  services: string[];
  customNote?: string;
  bookingDate: string;
  timeSlot: string;
  pickupRequired: boolean;
  totalEstimateINR: number;
  status: 'Booked' | 'Vehicle Received' | 'In Inspection' | 'In Progress' | 'Quality Check' | 'Ready for Delivery' | 'Completed';
  createdAt: string;
}

const bookingsStore: Booking[] = [
  {
    id: 'PIT-IND-1001',
    customerName: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    city: 'Mumbai (Andheri Pit)',
    carBrand: 'Mahindra',
    carModel: 'Thar LX 4x4',
    fuelType: 'Diesel',
    vehicleNumber: 'MH 02 ER 4589',
    services: ['Underbody Anti-Rust Coating', 'Offroad Bumper Installation', '64-Color Ambient Interior Lighting'],
    customNote: 'Please check rear suspension noise as well during inspection.',
    bookingDate: '2026-07-25',
    timeSlot: '10:00 AM - 12:00 PM',
    pickupRequired: true,
    totalEstimateINR: 38500,
    status: 'In Progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'PIT-IND-1002',
    customerName: 'Priya Sharma',
    phone: '+91 91234 56789',
    city: 'Bengaluru (Koramangala Pit)',
    carBrand: 'Volkswagen',
    carModel: 'Virtus GT 1.5 TSI',
    fuelType: 'Petrol',
    vehicleNumber: 'KA 01 MJ 9012',
    services: ['Stage 1 ECU Performance Remap', 'Valvetronic Performance Exhaust', 'Graphene Ceramic Detailing'],
    customNote: 'Looking for pops and bang tune setup.',
    bookingDate: '2026-07-26',
    timeSlot: '02:00 PM - 04:00 PM',
    pickupRequired: false,
    totalEstimateINR: 72000,
    status: 'Booked',
    createdAt: new Date().toISOString(),
  }
];

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Indian Auto Pit & Custom Garage API" });
});

// 1. AI Car Diagnostics & Mechanical Fault Estimator
app.post("/api/ai/diagnose", async (req, res) => {
  try {
    const { carBrand, carModel, fuelType, odometer, symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms description is required." });
    }

    if (!ai) {
      // Intelligent fallback structured response
      return res.json({
        diagnosis: `Preliminary diagnostic for ${carBrand || 'Vehicle'} ${carModel || ''}: Symptoms point towards wear in brake pads/rotors or suspension bushings given typical Indian road conditions.`,
        possibleCauses: [
          "Worn brake pads or warped brake disc rotors causing squeaking/vibration.",
          "Degraded stabilizer bar bushings or strut mounts due to potholes.",
          "Dust or debris accumulation in brake caliper assembly."
        ],
        affectedParts: ["Brake Pads Set", "Front Rotor Discs", "Suspension Bushings"],
        estimatedCostINR: {
          min: 3500,
          max: 8500,
          formatted: "₹3,500 - ₹8,500"
        },
        urgencyLevel: "Medium",
        drivingAdvice: "Drive below 50 km/h. Avoid sudden high-speed braking until inspected at the Pit Stop.",
        recommendedServices: ["Periodic Brake Overhaul", "Wheel Alignment & Suspension Check"]
      });
    }

    const prompt = `Act as an expert Indian automotive engineer and master mechanic at PitStop India Garage.
Diagnose the following issue for an Indian car:
Car Brand & Model: ${carBrand || 'Generic'} ${carModel || ''} (${fuelType || 'Petrol'}, Odometer: ${odometer || 'N/A'} km)
Customer Reported Issue / Symptoms: "${symptoms}"

Provide a detailed diagnostic analysis tailored for Indian road & weather conditions (monsoons, heat, traffic, potholes).
Format output as strict JSON with fields:
- diagnosis (string summary)
- possibleCauses (array of strings)
- affectedParts (array of strings)
- estimatedCostMinINR (number)
- estimatedCostMaxINR (number)
- urgencyLevel ("Low" | "Medium" | "High" | "Critical")
- drivingAdvice (string)
- recommendedServices (array of strings)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosis: { type: Type.STRING },
            possibleCauses: { type: Type.ARRAY, items: { type: Type.STRING } },
            affectedParts: { type: Type.ARRAY, items: { type: Type.STRING } },
            estimatedCostMinINR: { type: Type.NUMBER },
            estimatedCostMaxINR: { type: Type.NUMBER },
            urgencyLevel: { type: Type.STRING },
            drivingAdvice: { type: Type.STRING },
            recommendedServices: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["diagnosis", "possibleCauses", "affectedParts", "estimatedCostMinINR", "estimatedCostMaxINR", "urgencyLevel", "drivingAdvice", "recommendedServices"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({
      ...parsed,
      estimatedCostINR: {
        min: parsed.estimatedCostMinINR,
        max: parsed.estimatedCostMaxINR,
        formatted: `₹${parsed.estimatedCostMinINR?.toLocaleString('en-IN')} - ₹${parsed.estimatedCostMaxINR?.toLocaleString('en-IN')}`
      }
    });
  } catch (error: any) {
    console.error("AI Diagnose Error:", error);
    res.status(500).json({ error: "Failed to generate AI diagnostic report.", details: error.message });
  }
});

// 2. AI Custom Modification Advisor
app.post("/api/ai/mod-advisor", async (req, res) => {
  try {
    const { carBrand, carModel, styleGoal, budgetINR, priority } = req.body;

    if (!ai) {
      return res.json({
        packageTitle: `${styleGoal || 'Custom'} Edition Package for ${carBrand || 'Your Car'} ${carModel || ''}`,
        overview: `A tailored modification plan focused on ${priority || 'overall transformation'} designed for Indian roads.`,
        recommendedMods: [
          { item: "Satin Matte Full Body Wrap", estPriceINR: 45000, category: "Exterior Visual" },
          { item: "17-inch Custom Offroad/Forged Alloys", estPriceINR: 52000, category: "Wheels & Stance" },
          { item: "Stage 1 ECU Remap (+25 HP / +40 Nm)", estPriceINR: 28000, category: "Performance" },
          { item: "Valvetronic Dual Tip Exhaust", estPriceINR: 35000, category: "Sound & Flow" },
          { item: "64-Color Interior Ambient LED Kit", estPriceINR: 12000, category: "Interior Comfort" }
        ],
        totalBudgetEstimatedINR: 172000,
        rtoComplianceAdvice: "Wraps matching RC primary shade require simple RTO endorsed color update. Exhaust valve must be kept closed on city highways to comply with local noise regulations.",
        performanceGain: "+25 HP increase, faster throttle response, aggressive exhaust tone on demand."
      });
    }

    const prompt = `Act as India's top automotive modification expert at PitStop Custom Garage.
Design a car modification concept for:
Car: ${carBrand || 'Mahindra'} ${carModel || 'Thar'}
Desired Modification Theme/Goal: ${styleGoal || 'Stealth Performance'}
Target Budget in INR: ₹${budgetINR || '150000'}
Priority Focus: ${priority || 'Visual Stance & Performance'}

Consider Indian Motor Vehicle Act / RTO regulations (wrapping laws, exhaust noise caps, lift kit limits) and Indian road realities (ground clearance, monsoon waterproofing).

Return strict JSON with:
- packageTitle (string)
- overview (string)
- recommendedMods (array of objects with { item: string, estPriceINR: number, category: string })
- totalBudgetEstimatedINR (number)
- rtoComplianceAdvice (string)
- performanceGain (string)`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            packageTitle: { type: Type.STRING },
            overview: { type: Type.STRING },
            recommendedMods: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  estPriceINR: { type: Type.NUMBER },
                  category: { type: Type.STRING }
                },
                required: ["item", "estPriceINR", "category"]
              }
            },
            totalBudgetEstimatedINR: { type: Type.NUMBER },
            rtoComplianceAdvice: { type: Type.STRING },
            performanceGain: { type: Type.STRING }
          },
          required: ["packageTitle", "overview", "recommendedMods", "totalBudgetEstimatedINR", "rtoComplianceAdvice", "performanceGain"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json(parsed);
  } catch (error: any) {
    console.error("AI Mod Advisor Error:", error);
    res.status(500).json({ error: "Failed to generate modification advice.", details: error.message });
  }
});

// 3. Bookings & Job Cards API
app.get("/api/bookings", (req, res) => {
  res.json({ bookings: bookingsStore });
});

app.post("/api/bookings", (req, res) => {
  const { customerName, phone, city, carBrand, carModel, fuelType, vehicleNumber, services, customNote, bookingDate, timeSlot, pickupRequired, totalEstimateINR } = req.body;

  if (!customerName || !phone || !carBrand || !carModel || !services || services.length === 0) {
    return res.status(400).json({ error: "Missing required booking details (Name, Phone, Car Brand/Model, Services)." });
  }

  const newBooking: Booking = {
    id: `PIT-IND-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    phone,
    city: city || 'Mumbai (Andheri Pit)',
    carBrand,
    carModel,
    fuelType: fuelType || 'Petrol',
    vehicleNumber: vehicleNumber?.toUpperCase() || 'MH 01 AB 1234',
    services,
    customNote,
    bookingDate: bookingDate || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || '10:00 AM - 12:00 PM',
    pickupRequired: !!pickupRequired,
    totalEstimateINR: totalEstimateINR || 4999,
    status: 'Booked',
    createdAt: new Date().toISOString()
  };

  bookingsStore.unshift(newBooking);
  res.status(201).json({ success: true, booking: newBooking });
});

app.get("/api/bookings/:id", (req, res) => {
  const booking = bookingsStore.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ error: "Job card / Booking not found." });
  }
  res.json({ booking });
});

app.patch("/api/bookings/:id/status", (req, res) => {
  const { status } = req.body;
  const booking = bookingsStore.find(b => b.id.toLowerCase() === req.params.id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ error: "Job card not found." });
  }
  if (status) {
    booking.status = status;
  }
  res.json({ success: true, booking });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Indian Auto Pit Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
