
import { Property } from './types';

// Helper for generating varied interior features
const interiorFeatures = ['Smart Home Automation', 'Walk-in Closets', 'Chef\'s Kitchen', 'Marble Flooring', 'Home Cinema', 'Elevator', 'In-built Speakers', 'Jacuzzi', 'Gas Cooker', 'Heat Extractor', 'Central AC', 'Tiled Floors', 'Wardrobes', 'POP Ceiling'];

const saleTitles = [
  'Luxury 5 Bedroom Penthouse with BQ', 'Contemporary 4 Bedroom Terrace House', 'Exquisite 6 Bedroom Detached Mansion',
  'Prime 600sqm Land in Secured Estate', 'Modern 5 Bedroom Duplex with Cinema', 'Premium Industrial Warehouse Space',
  'Fully Serviced 3 Bedroom Apartment', 'Sophisticated 4 Bedroom Semi-Detached', 'High-Yield Commercial Plaza',
  'Elegant 5 Bedroom Smart Home', 'Architectural Masterpiece Duplex', 'Grand 7 Bedroom Palace',
  'Eco-Friendly 4 Bedroom Smart House', 'Urban 3 Bedroom Condominium', 'Spacious Corner-Piece Land',
  'Luxury Estate Mansion', 'Mini-Estate Development Land', 'Corporate Office Complex',
  'Executive Waterfront Villa', 'The Royal Penthouse'
];

const rentTitles = [
  'Standard 3 Bedroom Apartment', 'Luxury 2 Bedroom Serviced Flat', 'Spacious 4 Bedroom Duplex',
  'Self Contain Studio Apartment', 'Executive Office Space', 'Cozy 3 Bedroom Bungalow',
  'Modern 1 Bedroom Mini Flat', 'Open Plan Showroom', 'Premium 4 Bedroom Terrace',
  'Furnished 3 Bedroom Apartment', 'Quiet 2 Bedroom Flat', 'Retail Space in Shopping Mall',
  'Elegant Duplex for Corporate Lease', 'Renovated 3 Bedroom Home', 'Penthouse for Rent',
  'Serviced Mini-Flat', 'Semi-Detached 4 Bedroom House', 'Commercial Warehouse',
  'Studio Flat for Professionals', 'Upper Class 3 Bedroom Flat'
];

const shortLetTitles = [
  'Luxury 3 Bedroom Waterfront Penthouse', 'Cozy 1 Bedroom Studio for Travelers', 'Exquisite 4 Bedroom Villa with Pool',
  'Shortlet: Premium 2 Bedroom Flat', 'Luxury Shortstay Studio', 'Executive 3 Bedroom Serviced Apt',
  'Minimalist 2 Bedroom Shortlet', 'Celebrity Standard 5 Bedroom Villa', 'Home Away from Home 3 Bedroom',
  'Modern 1 Bedroom Studio Oniru', 'Staycation 2 Bedroom Haven', 'Business Suite Oniru',
  'Ocean View 3 Bedroom Shortlet', 'The Ikoyi Sanctuary', 'Signature Shortstay Duplex',
  'Vacation 4 Bedroom Villa', 'Designer 2 Bedroom Loft', 'The Guest House Shortlet',
  'Zen 1 Bedroom Apartment', 'Vibrant Victoria Island Suite'
];

const locations = [
  'Lekki Phase 1, Lagos', 'Asokoro, Abuja', 'Old GRA, Port Harcourt', 'Ibeju Lekki, Lagos', 'Guzape, Abuja',
  'Maitama, Abuja', 'Victoria Island, Lagos', 'Magodo Phase 2, Lagos', 'Enugu GRA', 'Trans Amadi, PH',
  'Banana Island, Lagos', 'Eko Atlantic, Lagos', 'Wuse 2, Abuja', 'Ikoyi, Lagos', 'Oniru, Lagos',
  'GRA, Benin City', 'Gwarinpa, Abuja', 'Surulere, Lagos', 'Ikeja GRA, Lagos', 'VGC, Lagos'
];

export const MOCK_PROPERTIES: Property[] = [
  // Base manual listings
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

  // Generated Sale Listings (20)
  ...saleTitles.map((title, i) => ({
    id: `sale-gen-${i}`,
    title,
    type: 'For Sale' as const,
    category: (i % 5 === 0 ? 'Land' : i % 8 === 0 ? 'Commercial' : i % 3 === 0 ? 'Flat' : 'House') as any,
    price: (i + 1) * 35000000 + 20000000,
    currency: '₦',
    location: locations[i % locations.length],
    beds: i % 5 === 0 ? undefined : (3 + (i % 4)),
    baths: i % 5 === 0 ? undefined : (3 + (i % 4)),
    toilets: i % 5 === 0 ? undefined : (4 + (i % 4)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1600596542815-ffad4c1539a9', '1600047509807-ba8f99d2cdde', '1600585154526-990dcea4db0d', '1512917774080-9991f1c4c750', 
      '1600566752355-3979ff69a3bc', '1586528116311-ad8dd3c8310d', '1527359443443-84a48abc7df8', '1564013799919-ab600027ffc6',
      '1486406146926-c627a92ad1ab', '1600585154340-be6161a56a0c', '1580587771525-78b9dba3b914', '1568605114967-8130f3a36994',
      '1513584684032-297924408895', '1448630360428-288d665b704e', '1416339442236-8ceb164046f8', '1523217582562-09d0def993a6',
      '1502672260266-1c1ef2d93688', '1582268611958-ebfd161ef9cf', '1494526585095-c41746248156', '1472224317457-5f96bc11b138'
    ][i % 20]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 4 === 0,
    postedDate: `${i + 1} day ago`,
    sqm: (i + 1) * 50 + 200,
    description: 'Luxury investment opportunity in a prime location. Verified documents and ready for immediate transfer of ownership.',
    interiorFeatures: interiorFeatures.slice(i % 5, (i % 5) + 5),
    amenities: ['24/7 Power', 'Gated Access', 'Treated Water']
  })),

  // Generated Rent Listings (20)
  ...rentTitles.map((title, i) => ({
    id: `rent-gen-${i}`,
    title,
    type: 'To Rent' as const,
    category: (i % 10 === 0 ? 'Commercial' : i % 4 === 0 ? 'House' : 'Flat') as any,
    price: (i + 1) * 800000 + 500000,
    currency: '₦',
    location: locations[(i + 5) % locations.length],
    beds: i % 10 === 0 ? undefined : (1 + (i % 4)),
    baths: i % 10 === 0 ? undefined : (1 + (i % 4)),
    toilets: i % 10 === 0 ? undefined : (2 + (i % 4)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1522708323590-d24dbb6b0267', '1493809842364-78817add7ffb', '1600585154340-be6161a56a0c', '1536376074432-bf121781188c',
      '1497366216548-37526070297c', '1580587771525-78b9dba3b914', '1502672260266-1c1ef2d93688', '1486406146926-c627a92ad1ab',
      '1564013799919-ab600027ffc6', '1527359443443-84a48abc7df8', '1554995207-c18c203602cb', '1494438639946-1ebd1d20bf85',
      '1484154218962-a197022b5858', '1512918766671-ad6507962077', '1515263487990-61b0082b6b02', '1560448204-61dc36dc98c8',
      '1464890100898-a385f744067f', '1582268611958-ebfd161ef9cf', '1481310198475-5945a1f7d19d', '1591474200742-8e512e6f98f8'
    ][i % 20]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 6 === 0,
    postedDate: `${i + 2} hours ago`,
    sqm: (i + 1) * 30 + 100,
    description: 'Strategically located with excellent road access. Ideal for families or professionals looking for a secure and comfortable living space.',
    interiorFeatures: interiorFeatures.slice(i % 4, (i % 4) + 4),
    amenities: ['Uniformed Security', 'Borehole', 'Spacious Compound']
  })),

  // Generated Short Let Listings (20)
  ...shortLetTitles.map((title, i) => ({
    id: `shortlet-gen-${i}`,
    title,
    type: 'Short Let' as const,
    category: (i % 5 === 0 ? 'House' : 'Flat') as any,
    price: (i + 1) * 15000 + 40000,
    currency: '₦',
    location: locations[(i + 10) % locations.length],
    beds: (1 + (i % 4)),
    baths: (1 + (i % 4)),
    toilets: (2 + (i % 4)),
    imageUrl: `https://images.unsplash.com/photo-${[
      '1502672260266-1c1ef2d93688', '1536376074432-bf121781188c', '1613977257363-707ba9348227', '1527359443443-84a48abc7df8',
      '1493809842364-78817add7ffb', '1512918766671-ad6507962077', '1522708323590-d24dbb6b0267', '1564013799919-ab600027ffc6',
      '1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d', '1554995207-c18c203602cb', '1560185127-6ed189bf02f4',
      '1505691938895-1758d7eaa511', '1499951360447-b19be8fe80f5', '1484154218962-a197022b5858', '1516455590571-18256e5bb9ff',
      '1580587771525-78b9dba3b914', '1472224317457-5f96bc11b138', '1600210492486-724fe5c67fb0', '1564013799919-ab600027ffc6'
    ][i % 20]}?auto=format&fit=crop&w=800&q=80`,
    featured: i % 3 === 0,
    postedDate: 'Just now',
    sqm: (i + 1) * 20 + 50,
    description: 'Exquisite short-stay apartment with five-star amenities. Fully serviced with high-speed internet, smart TVs, and premium concierge services.',
    interiorFeatures: ['WiFi', 'Smart TV', 'Chef Service', 'Netflix', 'Home Office'],
    amenities: ['24/7 Power', 'Swimming Pool', 'Daily Cleaning', 'Underground Parking']
  }))
];

export const LOCATIONS = [
  'Lagos', 'Abuja', 'Rivers', 'Oyo', 'Ogun', 'Enugu', 'Edo', 'Delta'
];

export const CATEGORIES = [
  'House', 'Flat / Apartment', 'Land', 'Commercial Property'
];
