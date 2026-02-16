
export interface Property {
  id: string;
  title: string;
  type: 'For Sale' | 'To Rent' | 'Short Let';
  category: 'House' | 'Flat' | 'Land' | 'Commercial';
  price: number;
  currency: string;
  location: string;
  beds?: number;
  baths?: number;
  toilets?: number;
  imageUrl: string;
  featured: boolean;
  postedDate: string;
  sqm?: number;
  description?: string;
  interiorFeatures?: string[];
  amenities?: string[];
  ownerId?: string; // New: link to user
  stats?: {
    views: number;
    saves: number;
    inquiries: number;
  };
}

export interface SearchFilters {
  type: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}

export interface Appointment {
  id: string;
  propertyId: string;
  userId: string;
  agentId: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  propertyId?: string;
}

export interface Offer {
  id: string;
  propertyId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Accepted' | 'Countered' | 'Rejected';
  timestamp: string;
}
