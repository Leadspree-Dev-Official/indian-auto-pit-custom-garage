import { CarBrand, GarageBranch } from '../types';

export const INDIAN_CAR_BRANDS: CarBrand[] = [
  {
    id: 'mahindra',
    name: 'Mahindra',
    logo: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=300&q=80',
    models: [
      {
        id: 'thar_4x4',
        name: 'Thar 4x4 / Roxx',
        type: 'Offroader',
        startingPriceINR: 1135000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Stealth Matte Black', hex: '#111827', class: 'bg-gray-900' },
          { name: 'Military Olive Green', hex: '#374151', class: 'bg-emerald-900' },
          { name: 'Rage Red Gloss', hex: '#dc2626', class: 'bg-red-600' },
          { name: 'Desert Dune Gold', hex: '#d97706', class: 'bg-amber-600' },
          { name: 'Satin Nardo Grey', hex: '#6b7280', class: 'bg-gray-500' }
        ]
      },
      {
        id: 'xuv700',
        name: 'XUV700 AX7',
        type: 'SUV',
        startingPriceINR: 1399000,
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Midnight Black', hex: '#000000', class: 'bg-black' },
          { name: 'Electric Blue Metallic', hex: '#2563eb', class: 'bg-blue-600' },
          { name: 'Satin Nardo Grey', hex: '#6b7280', class: 'bg-gray-500' },
          { name: 'Everest White Pearl', hex: '#f8fafc', class: 'bg-slate-100' }
        ]
      },
      {
        id: 'scorpio_n',
        name: 'Scorpio-N Z8L',
        type: 'SUV',
        startingPriceINR: 1385000,
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Deep Forest Green', hex: '#14532d', class: 'bg-green-900' },
          { name: 'Stealth Matte Black', hex: '#111827', class: 'bg-gray-900' },
          { name: 'Grand Canyon Red', hex: '#991b1b', class: 'bg-red-800' }
        ]
      }
    ]
  },
  {
    id: 'volkswagen',
    name: 'Volkswagen / Skoda',
    logo: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=300&q=80',
    models: [
      {
        id: 'virtus_gt',
        name: 'Virtus GT 1.5 TSI',
        type: 'Sedan',
        startingPriceINR: 1155000,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Wild Cherry Red', hex: '#b91c1c', class: 'bg-red-700' },
          { name: 'Satin Nardo Grey', hex: '#4b5563', class: 'bg-gray-600' },
          { name: 'Chameleon Purple Blue', hex: '#581c87', class: 'bg-purple-900' },
          { name: 'Piano Black Dual-Tone', hex: '#0f172a', class: 'bg-slate-900' }
        ]
      },
      {
        id: 'slavia',
        name: 'Skoda Slavia Monte Carlo',
        type: 'Sedan',
        startingPriceINR: 1169000,
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Tornado Red', hex: '#dc2626', class: 'bg-red-600' },
          { name: 'Carbon Black Matte', hex: '#18181b', class: 'bg-zinc-900' },
          { name: 'Race Blue Metallic', hex: '#1d4ed8', class: 'bg-blue-700' }
        ]
      }
    ]
  },
  {
    id: 'tata',
    name: 'Tata Motors',
    logo: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=300&q=80',
    models: [
      {
        id: 'nexon',
        name: 'Nexon / EV Fearless',
        type: 'SUV',
        startingPriceINR: 799000,
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Oceanic Cyan Gloss', hex: '#0891b2', class: 'bg-cyan-600' },
          { name: 'Dark Edition Stealth', hex: '#0f172a', class: 'bg-slate-900' },
          { name: 'Flame Red Gloss', hex: '#ef4444', class: 'bg-red-500' },
          { name: 'Daytona Grey Matte', hex: '#374151', class: 'bg-gray-700' }
        ]
      },
      {
        id: 'harrier',
        name: 'Harrier Dark Edition',
        type: 'SUV',
        startingPriceINR: 1549000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Oberon Black Satin', hex: '#09090b', class: 'bg-zinc-950' },
          { name: 'Sunlit Gold Pearl', hex: '#ca8a04', class: 'bg-yellow-600' },
          { name: 'Ash Grey Matte', hex: '#4b5563', class: 'bg-gray-600' }
        ]
      }
    ]
  },
  {
    id: 'maruti',
    name: 'Maruti Suzuki',
    logo: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=300&q=80',
    models: [
      {
        id: 'jimny_5door',
        name: 'Jimny 5-Door Alpha',
        type: 'Offroader',
        startingPriceINR: 1274000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Kinetic Yellow Neon', hex: '#eab308', class: 'bg-yellow-500' },
          { name: 'Army Camo Olive', hex: '#3f6212', class: 'bg-lime-800' },
          { name: 'Satin Nardo Grey', hex: '#6b7280', class: 'bg-gray-500' },
          { name: 'Stealth Black', hex: '#18181b', class: 'bg-zinc-900' }
        ]
      },
      {
        id: 'swift_2026',
        name: 'Swift Sport Custom',
        type: 'Hatchback',
        startingPriceINR: 649000,
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Luster Blue Pearl', hex: '#2563eb', class: 'bg-blue-600' },
          { name: 'Sizzling Red Gloss', hex: '#dc2626', class: 'bg-red-600' },
          { name: 'Speed Yellow', hex: '#f59e0b', class: 'bg-amber-500' }
        ]
      }
    ]
  },
  {
    id: 'hyundai',
    name: 'Hyundai / Kia',
    logo: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=300&q=80',
    models: [
      {
        id: 'creta_nline',
        name: 'Creta N Line Turbo',
        type: 'SUV',
        startingPriceINR: 1099000,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        wrapColors: [
          { name: 'Thunder Blue N Line', hex: '#1e40af', class: 'bg-blue-800' },
          { name: 'Shadow Grey Matte', hex: '#374151', class: 'bg-gray-700' },
          { name: 'Abyss Black Pearl', hex: '#0f172a', class: 'bg-slate-900' }
        ]
      }
    ]
  }
];

export const GARAGE_BRANCHES: GarageBranch[] = [
  {
    id: 'mumbai_andheri',
    name: 'PitStop India - Mumbai Flagship',
    city: 'Mumbai',
    address: 'Plot 42, Link Road, Opp. Infiniti Mall, Andheri West, Mumbai, MH 400053',
    phone: '+91 98200 78910',
    hours: 'Mon - Sun: 8:00 AM - 9:00 PM',
    googleMapUrl: 'https://maps.google.com',
    rating: 4.9,
    reviewsCount: 1840,
    specialties: ['High-Pressure Foam Pit', 'Ceramic & PPF Studio', 'Dyno Remapping', 'Custom Offroad Builds']
  },
  {
    id: 'bengaluru_koramangala',
    name: 'PitStop India - Bengaluru Tech Pit',
    city: 'Bengaluru',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru, KA 560034',
    phone: '+91 98800 12345',
    hours: 'Mon - Sun: 8:30 AM - 9:00 PM',
    googleMapUrl: 'https://maps.google.com',
    rating: 4.8,
    reviewsCount: 1420,
    specialties: ['German Car ECU Remapping', 'Valvetronic Exhausts', '3M Interior Steam', 'Paint Correction']
  },
  {
    id: 'delhi_gurugram',
    name: 'PitStop India - NCR Hub',
    city: 'Delhi NCR',
    address: 'Sector 29, Near IFFCO Chowk, Gurugram, HR 122001',
    phone: '+91 99100 54321',
    hours: 'Mon - Sun: 8:00 AM - 9:30 PM',
    googleMapUrl: 'https://maps.google.com',
    rating: 4.9,
    reviewsCount: 2150,
    specialties: ['Full Car Vinyl Wraps', 'Fortuner & Thar Custom Armor', 'Starry Sky Roofs', 'Brake Overhauls']
  },
  {
    id: 'pune_baner',
    name: 'PitStop India - Pune Express Pit',
    city: 'Pune',
    address: 'Baner Road, Near Balewadi High Street, Pune, MH 411045',
    phone: '+91 97650 99887',
    hours: 'Mon - Sun: 8:30 AM - 8:30 PM',
    googleMapUrl: 'https://maps.google.com',
    rating: 4.8,
    reviewsCount: 980,
    specialties: ['Underbody Anti-Rust', 'AC Leakage & Compressor Repair', 'Wheel Alignment', 'Detailing']
  },
  {
    id: 'hyderabad_gachibowli',
    name: 'PitStop India - Hyderabad Hub',
    city: 'Hyderabad',
    address: 'Financial District, Gachibowli, Hyderabad, TS 500032',
    phone: '+91 99890 33445',
    hours: 'Mon - Sun: 8:00 AM - 9:00 PM',
    googleMapUrl: 'https://maps.google.com',
    rating: 4.9,
    reviewsCount: 1100,
    specialties: ['Ambient Lighting', 'Ceramic Coatings', 'Suspension Overhaul', 'Custom Forged Alloy Rim Setup']
  }
];
