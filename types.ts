
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
  ownerId?: string;
  status?: 'Pending' | 'Approved' | 'Rejected' | 'Sold';
  stats?: {
    views: number;
    saves: number;
    inquiries: number;
  };
}

export interface User {
  id: string;
  email: string;
  password?: string;
  role: 'admin' | 'user' | 'agent' | 'developer' | 'landlord';
  name: string;
  joinedDate: string;
  bio?: string;
  phone?: string;
  savedPropertyIds?: string[];
  status: 'active' | 'suspended';
  verified: boolean;
  kycStatus: 'unsubmitted' | 'pending' | 'verified' | 'rejected';
  earnings?: number;
  subscriptionPlan?: 'free' | 'pro' | 'enterprise';
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'Subscription' | 'Commission' | 'Listing Boost' | 'Refund';
  status: 'Completed' | 'Pending' | 'Failed';
  timestamp: string;
  description: string;
}

export interface SystemSettings {
  platformName: string;
  logoUrl: string;
  aiEngineEnabled: boolean;
  maintenanceMode: boolean;
  globalCurrency: string;
  commissionRate: number;
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

// Added missing Inquiry interface to resolve import errors
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
