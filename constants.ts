
import { Property } from './types';

// Helper for generating varied interior features
const interiorFeatures = ['Smart Home Automation', 'Walk-in Closets', 'Chef\'s Kitchen', 'Marble Flooring', 'Home Cinema', 'Elevator', 'In-built Speakers', 'Jacuzzi', 'Gas Cooker', 'Heat Extractor', 'Central AC', 'Tiled Floors', 'Wardrobes', 'POP Ceiling'];

export const MOCK_PROPERTIES: Property[] = [
  // --- EXISTING PROPERTIES ---
  {
    id: '1',
    title: 'Modern 5 Bedroom Fully Detached Mansion',
    type: 'For Sale',
    category: 'House',
    price: 280000000,
    currency: '₦',
    location: 'Banana Island, Lagos',
    beds: 5,
    baths: 5,
    toilets: 6,
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: '1 hour ago',
    sqm: 1200,
    description: 'This architectural masterpiece offers unparalleled luxury in the heart of Banana Island. Features floor-to-ceiling windows, a private infinity pool, and high-end finishes throughout.',
    interiorFeatures: ['Smart Home Automation', 'Walk-in Closets', 'Chef\'s Kitchen', 'Marble Flooring', 'Home Cinema', 'Elevator'],
    amenities: ['24/7 Power', 'Gym', 'Swimming Pool', 'Fenced Backyard', 'CCTV', 'Underground Parking']
  },
  {
    id: '2',
    title: 'Luxury 3 Bedroom Waterfront Apartment',
    type: 'To Rent',
    category: 'Flat',
    price: 8500000,
    currency: '₦',
    location: 'Eko Atlantic, Victoria Island',
    beds: 3,
    baths: 3,
    toilets: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: '4 hours ago',
    sqm: 350,
    description: 'Experience living in the city of the future. This apartment offers stunning ocean views and state-of-the-art infrastructure.',
    interiorFeatures: ['Central Air Conditioning', 'Imported Kitchen Fittings', 'High Ceilings', 'Panoramic Windows'],
    amenities: ['Underground Parking', 'High-Speed Elevators', 'Intercom System', 'Concierge Service']
  },
  {
    id: '3',
    title: 'Prime Industrial Land (5000sqm)',
    type: 'For Sale',
    category: 'Land',
    price: 450000000,
    currency: '₦',
    location: 'Agbara Industrial Estate, Ogun',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    featured: false,
    postedDate: '12 hours ago',
    sqm: 5000,
    description: 'Strategically located plot of industrial land, perfect for large-scale manufacturing or warehousing.',
    amenities: ['Perimeter Fencing', 'Electricity Connection Ready', 'Approved Survey Plan', 'Industrial Zone']
  },
  {
    id: '4',
    title: 'Executive 4 Bedroom Semi-Detached Duplex',
    type: 'For Sale',
    category: 'House',
    price: 120000000,
    currency: '₦',
    location: 'Maitama, Abuja',
    beds: 4,
    baths: 4,
    toilets: 5,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: '1 day ago',
    sqm: 650,
    description: 'A beautifully crafted semi-detached duplex in the upscale neighborhood of Maitama.',
    interiorFeatures: ['POP Ceiling', 'Tiled Floors', 'Wardrobes', 'Inverter System', 'Pantry'],
    amenities: ['Gated Community', 'Armed Guard Presence', 'Constant Water Supply', 'Playground']
  },
  {
    id: '5',
    title: 'Contemporary 2 Bedroom Serviced Flat',
    type: 'To Rent',
    category: 'Flat',
    price: 4000000,
    currency: '₦',
    location: 'Old Ikoyi, Lagos',
    beds: 2,
    baths: 2,
    toilets: 3,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    featured: false,
    postedDate: '2 days ago',
    sqm: 180,
    description: 'Serviced luxury flat located in the serene environment of Old Ikoyi.',
    interiorFeatures: ['Fully Fitted Kitchen', 'Bathtub', 'Balcony', 'Smoke Detectors'],
    amenities: ['Standby Generator', 'Cleaning Services', 'Uniformed Security', 'Swimming Pool']
  },

  // --- FOR SALE (20 NEW) ---
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `sale-${i + 10}`,
    title: [
      'Luxury 5 Bedroom Penthouse with BQ',
      'Contemporary 4 Bedroom Terrace House',
      'Exquisite 6 Bedroom Detached Mansion',
      'Prime 600sqm Land in Secured Estate',
      'Modern 5 Bedroom Duplex with Cinema',
      'Premium Industrial Warehouse Space',
      'Fully Serviced 3 Bedroom Apartment',
      'Sophisticated 4 Bedroom Semi-Detached',
      'High-Yield Commercial Plaza',
      'Elegant 5 Bedroom Smart Home'
    ][i % 10],
    type: 'For Sale' as const,
    category: (i % 4 === 0 ? 'Land' : i % 5 === 0 ? 'Commercial' : i % 3 === 0 ? 'Flat' : 'House') as any,
    price: [45000000, 120000000, 350000000, 25000000, 550000000, 75000000, 850000000, 180000000, 42000000, 95000000][i % 10],
    currency: '₦',
    location: ['Lekki Phase 1, Lagos', 'Asokoro, Abuja', 'Old GRA, Port Harcourt', 'Ibeju Lekki, Lagos', 'Guzape, Abuja', 'Maitama, Abuja', 'Victoria Island, Lagos', 'Magodo Phase 2, Lagos', 'Enugu GRA', 'Trans Amadi, PH'][i % 10],
    beds: i % 4 === 0 ? undefined : (3 + (i % 4)),
    baths: i % 4 === 0 ? undefined : (3 + (i % 4)),
    toilets: i % 4 === 0 ? undefined : (4 + (i % 4)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1600596542815-ffad4c1539a9', '1600047509807-ba8f99d2cdde', '1600585154526-990dcea4db0d', '1500382017468-9049fed747ef', 
      '1600566752355-3979ff69a3bc', '1586528116311-ad8dd3c8310d', '1527359443443-84a48abc7df8', '1564013799919-ab600027ffc6',
      '1486406146926-c627a92ad1ab', '1600585154340-be6161a56a0c'
    ][i % 10]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 3 === 0,
    postedDate: `${i + 1} day${i === 0 ? '' : 's'} ago`,
    sqm: [450, 600, 1200, 300, 500, 1000, 250, 800, 400, 750][i % 10],
    description: 'This premium listing represents the pinnacle of real estate in this region. Perfect for investment or as a luxury family residence with top-tier security and amenities.',
    interiorFeatures: interiorFeatures.slice(i % 5, (i % 5) + 6),
    amenities: ['24/7 Power', 'Uniformed Security', 'Clean Water', 'Paved Road']
  })),

  // --- TO RENT (20 NEW) ---
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `rent-${i + 10}`,
    title: [
      'Standard 3 Bedroom Apartment',
      'Luxury 2 Bedroom Serviced Flat',
      'Spacious 4 Bedroom Duplex',
      'Self Contain Studio Apartment',
      'Executive Office Space',
      'Cozy 3 Bedroom Bungalow',
      'Modern 1 Bedroom Mini Flat',
      'Open Plan Showroom',
      'Premium 4 Bedroom Terrace',
      'Furnished 3 Bedroom Apartment'
    ][i % 10],
    type: 'To Rent' as const,
    category: (i % 8 === 0 ? 'Commercial' : i % 3 === 0 ? 'House' : 'Flat') as any,
    price: [1500000, 3500000, 7000000, 450000, 12000000, 2500000, 850000, 25000000, 5500000, 4000000][i % 10],
    currency: '₦',
    location: ['Surulere, Lagos', 'Yaba, Lagos', 'Gwarinpa, Abuja', 'Akoka, Lagos', 'Victoria Island, Lagos', 'Wuse 2, Abuja', 'Ikeja, Lagos', 'Lekki Phase 1, Lagos', 'Iko-Ekiti', 'Sangotedo, Lagos'][i % 10],
    beds: i % 8 === 0 ? undefined : (1 + (i % 4)),
    baths: i % 8 === 0 ? undefined : (1 + (i % 4)),
    toilets: i % 8 === 0 ? undefined : (2 + (i % 4)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1522708323590-d24dbb6b0267', '1493809842364-78817add7ffb', '1600585154340-be6161a56a0c', '1536376074432-bf121781188c',
      '1497366216548-37526070297c', '1580587771525-78b9dba3b914', '1502672260266-1c1ef2d93688', '1486406146926-c627a92ad1ab',
      '1564013799919-ab600027ffc6', '1527359443443-84a48abc7df8'
    ][i % 10]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 4 === 0,
    postedDate: `${i + 2} hour${i === 0 ? '' : 's'} ago`,
    sqm: [120, 180, 450, 45, 250, 300, 65, 500, 350, 200][i % 10],
    description: 'Beautifully finished rental option in a strategic location. Close to major landmarks, schools, and business districts. Ready for immediate move-in.',
    interiorFeatures: interiorFeatures.slice(i % 3, (i % 3) + 4),
    amenities: ['Borehole', 'Security', 'Waste Disposal']
  })),

  // --- SHORT LET (20 NEW) ---
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `shortlet-${i + 10}`,
    title: [
      'Luxury 3 Bedroom Waterfront Penthouse',
      'Cozy 1 Bedroom Studio for Travelers',
      'Exquisite 4 Bedroom Villa with Pool',
      'Shortlet: Premium 2 Bedroom Flat',
      'Luxury Shortstay Studio',
      'Executive 3 Bedroom Serviced Apt',
      'Minimalist 2 Bedroom Shortlet',
      'Celebrity Standard 5 Bedroom Villa',
      'Home Away from Home 3 Bedroom',
      'Modern 1 Bedroom Studio Oniru'
    ][i % 10],
    type: 'Short Let' as const,
    category: (i % 5 === 0 ? 'House' : 'Flat') as any,
    price: [150000, 45000, 250000, 85000, 55000, 120000, 75000, 450000, 110000, 60000][i % 10],
    currency: '₦',
    location: ['Oniru, Lagos', 'Victoria Island, Lagos', 'Banana Island, Lagos', 'Lekki Phase 1, Lagos', 'Asokoro, Abuja', 'Maitama, Abuja', 'Eko Atlantic, Lagos', 'Osapa London, Lagos', 'Jabi, Abuja', 'Ikoyi, Lagos'][i % 10],
    beds: (1 + (i % 5)),
    baths: (1 + (i % 5)),
    toilets: (2 + (i % 5)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1502672260266-1c1ef2d93688', '1536376074432-bf121781188c', '1613977257363-707ba9348227', '1527359443443-84a48abc7df8',
      '1493809842364-78817add7ffb', '1512918766671-ad6507962077', '1522708323590-d24dbb6b0267', '1564013799919-ab600027ffc6',
      '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d'
    ][i % 10]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 2 === 0,
    postedDate: 'Just now',
    sqm: [250, 50, 800, 150, 60, 220, 140, 1200, 180, 55][i % 10],
    description: 'Experience ultimate luxury in our short-stay apartments. Fully fitted with modern electronics, high-speed WiFi, and 24/7 power. Perfect for business or leisure.',
    interiorFeatures: ['WiFi', 'Smart TV', 'Fully Equipped Kitchen', 'Netflix', 'PS5', 'Washing Machine'],
    amenities: ['24/7 Power', 'Swimming Pool', 'Gym', 'Daily Housekeeping', 'Tight Security']
  }))
];

export const LOCATIONS = [
  'Lagos', 'Abuja', 'Rivers', 'Oyo', 'Ogun', 'Enugu', 'Edo', 'Delta'
];

export const CATEGORIES = [
  'House', 'Flat / Apartment', 'Land', 'Commercial Property'
];
