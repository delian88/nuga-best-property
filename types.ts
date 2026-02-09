
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
}

export interface SearchFilters {
  type: string;
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
}
