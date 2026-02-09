
import { Property } from './types';

export const MOCK_PROPERTIES: Property[] = [
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
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: '1 hour ago'
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
    postedDate: '4 hours ago'
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
    postedDate: '12 hours ago'
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
    postedDate: '1 day ago'
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
    postedDate: '2 days ago'
  },
  {
    id: '6',
    title: 'Residential Land in Gated Community',
    type: 'For Sale',
    category: 'Land',
    price: 35000000,
    currency: '₦',
    location: 'Ibeju-Lekki, Lagos',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: '3 days ago'
  },
  {
    id: '7',
    title: 'Grade A Office Complex for Multi-tenant',
    type: 'To Rent',
    category: 'Commercial',
    price: 25000000,
    currency: '₦',
    location: 'Central Business District, Abuja',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: false,
    postedDate: '5 days ago'
  },
  {
    id: '8',
    title: 'Beautiful 4 Bedroom Bungalow',
    type: 'For Sale',
    category: 'House',
    price: 55000000,
    currency: '₦',
    location: 'Independence Layout, Enugu',
    beds: 4,
    baths: 3,
    toilets: 4,
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    featured: false,
    postedDate: '1 week ago'
  },
  {
    id: '9',
    title: 'Short Let: Luxury Penthouse with City View',
    type: 'Short Let',
    category: 'Flat',
    price: 180000,
    currency: '₦',
    location: 'Oniru, Victoria Island',
    beds: 3,
    baths: 3,
    toilets: 4,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    featured: true,
    postedDate: 'Just now'
  },
  {
    id: '10',
    title: 'Standard 3 Bedroom Apartment',
    type: 'To Rent',
    category: 'Flat',
    price: 1800000,
    currency: '₦',
    location: 'Surulere, Lagos',
    beds: 3,
    baths: 2,
    toilets: 3,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    featured: false,
    postedDate: '2 hours ago'
  }
];

export const LOCATIONS = [
  'Lagos', 'Abuja', 'Rivers', 'Oyo', 'Ogun', 'Enugu', 'Edo', 'Delta'
];

export const CATEGORIES = [
  'House', 'Flat / Apartment', 'Land', 'Commercial Property'
];
