import { ServiceItem } from '../types';

export const ALL_SERVICES: ServiceItem[] = [
  // --- CAR WASHING & DETAILING PIT ---
  {
    id: 'foam_underbody_wash',
    name: 'High-Pressure Foam & Underbody Pit Wash',
    category: 'washing',
    priceINR: 799,
    originalPriceINR: 1199,
    duration: '45 mins',
    description: 'Thorough dual-action snow foam bath, underbody high-pressure mud jetting, vacuuming, and dashboard shine.',
    features: [
      'pH-Neutral Snow Foam Wash',
      'High-Pressure Underbody Chassis Jet Clean',
      'Interior Cabin Vacuuming & Footmat Wash',
      'Tyre Dressing & Alloy Shine',
      'Glass Streak-free Wipe'
    ],
    iconName: 'Sparkles',
    badge: 'Popular',
    popular: true
  },
  {
    id: 'ceramic_wash_wax',
    name: 'Hydrophobic Ceramic Wash & Hybrid Wax',
    category: 'washing',
    priceINR: 1499,
    originalPriceINR: 2199,
    duration: '1 hr 15 mins',
    description: 'Ceramic-infused shampoo wash followed by hand-applied synthetic sealant wax for instant water beading.',
    features: [
      'Decontaminating Clay Bar Treatment',
      'Ceramic Infused Shampoo Scrub',
      'Hand-Applied Synthetic Polymer Sealant Wax',
      'Hydrophobic Glass Treatment',
      'Door Sills & Boot Clean'
    ],
    iconName: 'Droplets',
    badge: 'Hydrophobic'
  },
  {
    id: 'interior_steam_sanitization',
    name: '3M Interior Deep Steam Sanitization',
    category: 'washing',
    priceINR: 2499,
    originalPriceINR: 3499,
    duration: '2 hrs',
    description: '140°C pressurized dry steam sanitization removing 99.9% bacteria, stain extraction, and AC vent deep clean.',
    features: [
      '140°C High-Pressure Dry Steam Cabin Sterilization',
      'Fabric/Leather Seat Shampoo Stain Extraction',
      'AC Vent Duct Steam Clean & Antimicrobial Spray',
      'Dashboard & Door Panel Leather Conditioning',
      'Trunk & Spare Tyre Bay Deep Clean'
    ],
    iconName: 'ShieldCheck',
    badge: 'Hygienic'
  },
  {
    id: 'graphene_ceramic_coating',
    name: 'Graphene Ceramic Coating (9H Matrix)',
    category: 'washing',
    priceINR: 18500,
    originalPriceINR: 25000,
    duration: '1 Day',
    description: '3-Layer 9H Graphene Ceramic Coating with 3-year warranty, dual-stage paint correction, and UV gloss lock.',
    features: [
      'Dual-Stage Machine Compound Paint Correction',
      '3 Layers of 9H Matrix Graphene Shield',
      '3-Year Official Written Warranty & Annual Inspection',
      'Super Hydrophobic Water Beading & UV Protection',
      'Free 1st Maintenance Ceramic Wash Included'
    ],
    iconName: 'Award',
    badge: '3-Year Warranty',
    popular: true
  },
  {
    id: 'self_healing_ppf',
    name: 'Full Body TPU Self-Healing PPF',
    category: 'washing',
    priceINR: 75000,
    originalPriceINR: 95000,
    duration: '2 Days',
    description: '190 Micron TPU Paint Protection Film with instant heat-activated self-healing against stone chips and scratches.',
    features: [
      'Ultra-Clear 190 Micron TPU Film',
      'Heat-Activated Self-Healing Scratch Layer',
      '5-Year Non-Yellowing & Anti-Cracking Warranty',
      'Custom Computer Precision Pattern Cuts',
      'Full Edge Wrapping for Invisible Fit'
    ],
    iconName: 'Shield',
    badge: 'Ultimate Shield'
  },

  // --- REPAIR & MAINTENANCE PIT ---
  {
    id: 'periodic_service_10k',
    name: 'Full Periodic Maintenance Service (10k/20k km)',
    category: 'repair',
    priceINR: 3999,
    originalPriceINR: 5499,
    duration: '2.5 hrs',
    description: 'Complete OEM engine oil change, oil filter replacement, air/cabin filter cleaning, and 50-point safety check.',
    features: [
      'Fully Synthetic Engine Oil Replacement (Shell/Mobil1)',
      'OEM Grade Engine Oil Filter & Washer Replacement',
      'Air Filter & AC Cabin Filter Cleaning / Swap',
      'Spark Plug / Fuel Filter Inspection',
      'Brake Pad, Suspension & Fluid Level Inspection',
      'Free Complimentary Foam Car Wash'
    ],
    iconName: 'Wrench',
    badge: 'Recommended',
    popular: true
  },
  {
    id: 'clutch_gearbox_overhaul',
    name: 'Clutch Assembly & Gearbox Overhaul',
    category: 'repair',
    priceINR: 8500,
    originalPriceINR: 11000,
    duration: '4 hrs',
    description: 'Eliminate gear slipping, hard clutch pedal, and judder. Replacement with OEM Valeo/Sachs clutch kits.',
    features: [
      'OEM Friction Clutch Plate & Pressure Plate Kit',
      'Release Bearing & Clutch Cable/Cylinder Swap',
      'Flywheel Inspection & Surfacing',
      'Synthetic Gearbox Oil Replacement',
      'Pedal Free-Play Calibration & Road Test'
    ],
    iconName: 'Settings',
    badge: 'OEM Parts'
  },
  {
    id: 'ac_chill_max_repair',
    name: 'AC Gas Leak Repair & Chill-Max Overhaul',
    category: 'repair',
    priceINR: 2200,
    originalPriceINR: 2999,
    duration: '1.5 hrs',
    description: 'Restore ice-cold cooling for peak Indian summers. Nitrogen pressure leak test, R134a/R1234yf refilling & PAG oil.',
    features: [
      'Automated R134a Refrigerant Evacuation & Refill',
      'Nitrogen Pressure Leak Detection Test',
      'Compressor Synthetic PAG Lubricant Oil Top-Up',
      'Condenser & Cooling Coil Dust Jet Clean',
      'AC Filter Chemical Treatment'
    ],
    iconName: 'Snowflake',
    badge: 'Ice Cold'
  },
  {
    id: 'suspension_steering_overhaul',
    name: 'Full Suspension & Steering Pit Overhaul',
    category: 'repair',
    priceINR: 9800,
    originalPriceINR: 13500,
    duration: '4 hrs',
    description: 'Fix pothole thuds, body roll, and steering vibration. Includes shock absorbers, link rods, and tie rod ends.',
    features: [
      'Gas-Charged Front/Rear Shock Absorbers (Gabriel/Monroe)',
      'Stabilizer Bar Link Rods & Bushings Kit',
      'Tie Rod Ends & Steering Rack Bushings Inspection',
      '3D Laser Wheel Alignment & Dynamic Wheel Balancing',
      'Test Drive on Rough Road Track'
    ],
    iconName: 'Maximize2',
    badge: 'Pothole Ready'
  },
  {
    id: 'obd2_diagnostics_scan',
    name: 'OBD2 Laser Computer Diagnostics & ECU Scan',
    category: 'repair',
    priceINR: 999,
    originalPriceINR: 1499,
    duration: '30 mins',
    description: 'Full vehicle electronic system health scan, check engine light diagnosis, sensor calibration, and diagnostic report.',
    features: [
      'Launch/Bosch Master OBD2 Scanner Scan',
      'Engine, ABS, Airbag, BCM & Transmission Diagnostics',
      'Check Engine Light Erase & Fault Code Clearing',
      'Live Sensor Data & Throttle Calibration',
      'Printable Digital Health Certificate'
    ],
    iconName: 'Cpu',
    badge: 'Instant Tech'
  },

  // --- MODIFICATIONS & CUSTOMIZATION PIT ---
  {
    id: 'full_vinyl_wrap',
    name: 'Full Vehicle Vinyl Wrap (Satin/Matte/Chameleon)',
    category: 'modification',
    priceINR: 38000,
    originalPriceINR: 48000,
    duration: '2-3 Days',
    description: 'Transform your vehicle looks completely with premium 3M / Avery Dennison automotive vinyl wraps.',
    features: [
      'Premium 3M 2080 / Avery Dennison Dual-Cast Film',
      'Over 80+ Finishes (Satin Nardo Grey, Matte Black, Metallic Olive, Chameleon)',
      'Tuck & Edge Wrapped for Paint-Like Seamless Finish',
      'Non-Damaging Removal & Paint Protection',
      'RTO Guidance & Endorsement Support'
    ],
    iconName: 'Paintbrush',
    badge: 'Transformation',
    popular: true
  },
  {
    id: 'valvetronic_performance_exhaust',
    name: 'Valvetronic Performance Exhaust (Dual Sound)',
    category: 'modification',
    priceINR: 32000,
    originalPriceINR: 42000,
    duration: '3 hrs',
    description: 'Wireless remote controlled exhaust valve switch between silent OEM stock tone and loud sporty roar with pops.',
    features: [
      'T304 Aircraft Grade Stainless Steel Mandrel-Bent Piping',
      'Dual Carbon Fiber / Titanium Burned Exhaust Tips',
      'Wireless Key Fob Remote Control Valve Mechanism',
      'Custom Resonated Mid-Pipe & Muffler Tuning',
      '+8 HP Dyno Proven Power Gains'
    ],
    iconName: 'Volume2',
    badge: 'Pops & Bangs',
    popular: true
  },
  {
    id: 'stage1_ecu_remap',
    name: 'Stage 1 Custom ECU Performance Remap',
    category: 'modification',
    priceINR: 24000,
    originalPriceINR: 30000,
    duration: '2 hrs',
    description: 'Safely unlock +25% Horsepower and +35% Torque with optimized turbo boost maps, removed speed limiter, and improved mileage.',
    features: [
      'Custom Map Calibration Tailored for Indian Fuel Quality',
      '+25 HP to +40 HP & +50 Nm Torque Gain',
      'Sharper Throttle Response & Smoother Acceleration',
      'Top Speed Limiter Removal & Rev Limiter Adjust',
      'Reversible to Stock Factory Map Anytime'
    ],
    iconName: 'Zap',
    badge: 'Power Unleashed',
    popular: true
  },
  {
    id: 'offroad_bumper_winch',
    name: 'Offroad Steel Armor Bumper & Winch Mount',
    category: 'modification',
    priceINR: 28500,
    originalPriceINR: 36000,
    duration: '3 hrs',
    description: 'Heavy duty cold-rolled steel bumper designed specifically for Mahindra Thar, Scorpio-N, Jimny and Fortuner.',
    features: [
      '3.5mm Cold-Rolled Steel Construction with Powder Coating',
      'Integrated High-Lift Jack Points & D-Ring Shackles',
      'Heavy Duty 9,500 lbs Winch Mounting Plate',
      'Built-in Flush LED Pod Fog Lights',
      'Zero Chassis Cutting Required'
    ],
    iconName: 'ShieldAlert',
    badge: '4x4 Tough'
  },
  {
    id: 'ambient_lighting_64color',
    name: '64-Color Symphony Interior Ambient LED Kit',
    category: 'modification',
    priceINR: 9500,
    originalPriceINR: 13500,
    duration: '2.5 hrs',
    description: 'Rolls Royce style app-controlled optical fiber lighting for dashboard, door trims, footwells and handles.',
    features: [
      'High Brightness Acrylic Fiber Optic LED Strips',
      'Smartphone App & Remote Control with 64 Colors',
      'Multi-Zone Custom Color & Music Beat Rhythm Sync',
      'OEM Hidden Wiring without Any Factory Wire Splicing',
      '1-Year Replacement Warranty'
    ],
    iconName: 'Sun',
    badge: 'VIP Cabin'
  },
  {
    id: 'starry_sky_roof',
    name: 'Starry Sky Rolls-Royce Fiber Optic Headliner',
    category: 'modification',
    priceINR: 22000,
    originalPriceINR: 29000,
    duration: '1 Day',
    description: 'Custom handcrafted ceiling featuring 450+ optical fiber stars with shooting star meteor effects.',
    features: [
      '450+ Micro Optical Fiber Star Points Hand-Threaded',
      'Shooting Star Meteor Shower Controller Unit',
      'Custom Fabric Suede/Alcantara Roof Re-upholstery',
      'App Controlled Twinkle & RGB Color Mixing',
      'Zero Battery Drain Protection Circuit'
    ],
    iconName: 'Star',
    badge: 'Luxury'
  }
];

export const TRANSFORMATION_STORIES = [
  {
    id: 'story_1',
    title: 'Mahindra Thar 4x4 - "Black Beast Edition"',
    car: 'Mahindra Thar LX',
    location: 'Mumbai Pit',
    owner: 'Vikram S.',
    timeTaken: '3 Days',
    beforeImg: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    summary: 'Converted stock Thar into an aggressive off-road monster with 2-inch suspension lift, offroad steel bumpers, matte black wrap, custom alloys & valvetronic exhaust.',
    modList: ['Stealth Matte Wrap', '2" Suspension Lift', '17" Offroad Alloys', 'Valvetronic Exhaust', '64-Color Ambient Light'],
    costINR: 185000
  },
  {
    id: 'story_2',
    title: 'Volkswagen Virtus GT - "Stage 1 Nardo Stealth"',
    car: 'Virtus GT 1.5 TSI',
    location: 'Bengaluru Pit',
    owner: 'Arjun M.',
    timeTaken: '2 Days',
    beforeImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
    summary: 'Stage 1 ECU remap (+35 HP), Satin Nardo Grey wrap, quad carbon exhaust tips, and 9H Graphene Ceramic Coating.',
    modList: ['Stage 1 ECU Remap (+35HP)', 'Satin Nardo Grey Wrap', 'Quad Carbon Tips', 'Graphene Ceramic Coating'],
    costINR: 125000
  },
  {
    id: 'story_3',
    title: 'Tata Harrier Dark - "Ultimate Gloss Restoration"',
    car: 'Harrier Dark Edition',
    location: 'Delhi NCR Hub',
    owner: 'Karan Singh',
    timeTaken: '1.5 Days',
    beforeImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    afterImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    summary: 'Paint correction eliminating 98% swirl marks, TPU Self-Healing PPF on full front fascia, and 3M interior steam detailing.',
    modList: ['TPU Self-Healing PPF', 'Dual-Stage Paint Correction', '3M Interior Steam', 'Starry Sky Roof'],
    costINR: 98000
  }
];
