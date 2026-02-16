
import { Property, Appointment, ChatMessage, Offer } from '../types';
import { MOCK_PROPERTIES } from '../constants';

const DB_PREFIX = 'nuga_postgres_';
const MIGRATION_KEY = 'nuga_migrations';

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
}

// Fix: Added exported Inquiry interface to resolve missing member errors in App.tsx and AdminDashboard.tsx
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

interface Migration {
  version: number;
  name: string;
  executedAt: string;
}

class VirtualPostgres {
  private static instance: VirtualPostgres;

  private constructor() {
    this.init();
  }

  public static getInstance(): VirtualPostgres {
    if (!VirtualPostgres.instance) {
      VirtualPostgres.instance = new VirtualPostgres();
    }
    return VirtualPostgres.instance;
  }

  private async init() {
    const migrations = this.getMigrations();
    
    if (!migrations.find(m => m.version === 1)) {
      console.log('Running Migration v1: DB Init...');
      const admin: User = {
        id: 'usr_admin_001',
        email: 'admin@nugabest.com',
        password: 'admin12345',
        role: 'admin',
        name: 'Nuga Executive',
        joinedDate: new Date().toISOString(),
        savedPropertyIds: []
      };
      
      this.saveTable('users', [admin]);
      
      // Initialize properties with owner assignment
      const propsWithOwners = MOCK_PROPERTIES.map(p => ({
        ...p,
        ownerId: 'usr_admin_001',
        stats: { views: Math.floor(Math.random() * 1000), saves: Math.floor(Math.random() * 100), inquiries: Math.floor(Math.random() * 50) }
      }));
      this.saveTable('properties', propsWithOwners);
      
      this.saveTable('inquiries', []);
      this.saveTable('appointments', []);
      this.saveTable('messages', []);
      this.saveTable('offers', []);
      
      this.recordMigration(1, 'Initial Schema Setup');
    }
  }

  private getMigrations(): Migration[] {
    const data = localStorage.getItem(MIGRATION_KEY);
    return data ? JSON.parse(data) : [];
  }

  private recordMigration(version: number, name: string) {
    const migrations = this.getMigrations();
    migrations.push({ version, name, executedAt: new Date().toISOString() });
    localStorage.setItem(MIGRATION_KEY, JSON.stringify(migrations));
  }

  private getTable<T>(name: string): T[] {
    const data = localStorage.getItem(`${DB_PREFIX}${name}`);
    return data ? JSON.parse(data) : [];
  }

  private saveTable<T>(name: string, data: T[]) {
    localStorage.setItem(`${DB_PREFIX}${name}`, JSON.stringify(data));
  }

  // ASYNC API METHODS
  public async queryUsers(): Promise<User[]> {
    return this.getTable<User>('users');
  }

  public async updateUser(user: User): Promise<void> {
    const users = this.getTable<User>('users');
    const idx = users.findIndex(u => u.id === user.id);
    if (idx > -1) {
      users[idx] = user;
      this.saveTable('users', users);
    }
  }

  public async createUser(user: User): Promise<void> {
    const users = this.getTable<User>('users');
    this.saveTable('users', [...users, user]);
  }

  public async queryProperties(): Promise<Property[]> {
    return this.getTable<Property>('properties');
  }

  public async querySavedProperties(userId: string): Promise<Property[]> {
    const users = this.getTable<User>('users');
    const user = users.find(u => u.id === userId);
    if (!user || !user.savedPropertyIds) return [];
    const props = this.getTable<Property>('properties');
    return props.filter(p => user.savedPropertyIds!.includes(p.id));
  }

  public async toggleSaveProperty(userId: string, propertyId: string): Promise<void> {
    const users = this.getTable<User>('users');
    const userIdx = users.findIndex(u => u.id === userId);
    if (userIdx > -1) {
      const saved = users[userIdx].savedPropertyIds || [];
      if (saved.includes(propertyId)) {
        users[userIdx].savedPropertyIds = saved.filter(id => id !== propertyId);
      } else {
        users[userIdx].savedPropertyIds = [...saved, propertyId];
      }
      this.saveTable('users', users);
    }
  }

  public async queryAppointments(userId: string): Promise<Appointment[]> {
    return this.getTable<Appointment>('appointments').filter(a => a.userId === userId || a.agentId === userId);
  }

  public async createAppointment(apt: Appointment): Promise<void> {
    const apts = this.getTable<Appointment>('appointments');
    this.saveTable('appointments', [...apts, apt]);
  }

  public async queryMessages(userId: string): Promise<ChatMessage[]> {
    return this.getTable<ChatMessage>('messages').filter(m => m.senderId === userId || m.receiverId === userId);
  }

  public async sendMessage(msg: ChatMessage): Promise<void> {
    const msgs = this.getTable<ChatMessage>('messages');
    this.saveTable('messages', [...msgs, msg]);
  }

  public async queryOffers(userId: string): Promise<Offer[]> {
    return this.getTable<Offer>('offers').filter(o => o.buyerId === userId || o.sellerId === userId);
  }

  public async createOffer(offer: Offer): Promise<void> {
    const offers = this.getTable<Offer>('offers');
    this.saveTable('offers', [...offers, offer]);
  }

  public async upsertProperty(property: Property): Promise<void> {
    const props = this.getTable<Property>('properties');
    const idx = props.findIndex(p => p.id === property.id);
    if (idx > -1) {
      props[idx] = property;
      this.saveTable('properties', props);
    } else {
      this.saveTable('properties', [property, ...props]);
    }
  }

  public async deleteProperty(id: string): Promise<void> {
    const props = this.getTable<Property>('properties').filter(p => p.id !== id);
    this.saveTable('properties', props);
  }

  // Fix: Added queryInquiries method to resolve missing property error in AdminDashboard.tsx
  public async queryInquiries(): Promise<Inquiry[]> {
    return this.getTable<Inquiry>('inquiries');
  }

  // Fix: Updated createInquiry to use the Inquiry interface for better type safety
  public async createInquiry(inquiry: Inquiry): Promise<void> {
    const inqs = this.getTable<Inquiry>('inquiries');
    this.saveTable('inquiries', [inquiry, ...inqs]);
  }
}

export const db = VirtualPostgres.getInstance();
