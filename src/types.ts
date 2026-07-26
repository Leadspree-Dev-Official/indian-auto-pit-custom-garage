export type ServiceCategory = 'washing' | 'repair' | 'modification';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  priceINR: number;
  originalPriceINR?: number;
  duration: string;
  description: string;
  features: string[];
  iconName: string;
  badge?: string;
  popular?: boolean;
}

export interface CarModel {
  id: string;
  name: string;
  type: 'SUV' | 'Sedan' | 'Hatchback' | 'Offroader' | 'EV' | 'MPV';
  startingPriceINR: number;
  image: string;
  wrapColors: { name: string; hex: string; class: string }[];
}

export interface CarBrand {
  id: string;
  name: string;
  logo: string;
  models: CarModel[];
}

export interface GarageBranch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: string;
  googleMapUrl: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
}

export interface ConfiguratorState {
  brandId: string;
  modelId: string;
  wrapColorHex: string;
  wrapColorName: string;
  alloyStyle: string;
  alloyPriceINR: number;
  suspensionType: string;
  suspensionPriceINR: number;
  exhaustType: string;
  exhaustPriceINR: number;
  lightingType: string;
  lightingPriceINR: number;
  stage1Remap: boolean;
  remapPriceINR: number;
}

export interface Booking {
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

export interface DiagnosticResult {
  diagnosis: string;
  possibleCauses: string[];
  affectedParts: string[];
  estimatedCostMinINR: number;
  estimatedCostMaxINR: number;
  estimatedCostINR?: {
    min: number;
    max: number;
    formatted: string;
  };
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  drivingAdvice: string;
  recommendedServices: string[];
}

export interface ModAdvisorResult {
  packageTitle: string;
  overview: string;
  recommendedMods: {
    item: string;
    estPriceINR: number;
    category: string;
  }[];
  totalBudgetEstimatedINR: number;
  rtoComplianceAdvice: string;
  performanceGain: string;
}
