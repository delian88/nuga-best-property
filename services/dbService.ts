
import { Property, Appointment, ChatMessage, Offer, User, Inquiry, Transaction, SystemSettings } from '../types';
import { MOCK_PROPERTIES } from '../constants';

const DB_PREFIX = 'nuga_v_pg_';
const MIGRATION_KEY = 'nuga_v_pg_migrations';

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
    
    // Migration v1: Foundation
    if (!migrations.find(m => m.version === 1)) {
      console.log('PG MIGRATION: V1 Running...');
      
      const admin: User = {
        id: 'usr_admin_001',
        email: 'admin@nugabest.com',
        password: 'admin12345',
        role: 'admin',
        name: 'Executive Super Admin',
        joinedDate: new Date().toISOString(),
        savedPropertyIds: [],
        status: 'active',
        verified: true,
        kycStatus: 'verified',
        subscriptionPlan: 'enterprise'
      };

      this.saveTable('users', [admin]);
      
      const propsWithOwners = MOCK_PROPERTIES.map(p => ({
        ...p,
        ownerId: 'usr_admin_001',
        status: 'Approved' as const,
        stats: { 
          views: Math.floor(Math.random() * 5000), 
          saves: Math.floor(Math.random() * 500), 
          inquiries: Math.floor(Math.random() * 150) 
        }
      }));
      this.saveTable('properties', propsWithOwners);
      
      this.saveTable('inquiries', [
        { id: 'inq_1', name: 'Alice Smith', email: 'alice@example.com', message: 'Interested in the Ikoyi penthouse.', timestamp: new Date().toLocaleString() }
      ]);
      
      this.saveTable('transactions', [
        { id: 'tx_1', userId: 'usr_admin_001', amount: 500000, currency: '₦', type: 'Commission', status: 'Completed', timestamp: new Date().toISOString(), description: 'Ikoyi Penthouse Sale Commission' },
        { id: 'tx_2', userId: 'usr_admin_001', amount: 120000, currency: '₦', type: 'Subscription', status: 'Completed', timestamp: new Date().toISOString(), description: 'Agent Enterprise Yearly' }
      ]);

      const initialSettings: SystemSettings = {
        platformName: 'Nuga Best Properties',
        logoUrl: '',
        aiEngineEnabled: true,
        maintenanceMode: false,
        globalCurrency: '₦',
        commissionRate: 5.0
      };
      this.saveTable('system_settings', [initialSettings]);
      
      this.recordMigration(1, 'Initial Super Admin Schema');
    }

    // Ensure empty tables exist
    if (!localStorage.getItem(`${DB_PREFIX}appointments`)) this.saveTable('appointments', []);
    if (!localStorage.getItem(`${DB_PREFIX}messages`)) this.saveTable('messages', []);
    if (!localStorage.getItem(`${DB_PREFIX}offers`)) this.saveTable('offers', []);
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
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error(`DB_ERROR: Failed to parse table ${name}`, e);
      return [];
    }
  }

  private saveTable<T>(name: string, data: T[]) {
    try {
      localStorage.setItem(`${DB_PREFIX}${name}`, JSON.stringify(data));
    } catch (e) {
      console.error(`DB_ERROR: Failed to save table ${name}`, e);
    }
  }

  // USER OPERATIONS
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

  // PROPERTY OPERATIONS
  public async queryProperties(): Promise<Property[]> {
    return this.getTable<Property>('properties');
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

  // FINANCIALS
  public async queryTransactions(): Promise<Transaction[]> {
    return this.getTable<Transaction>('transactions');
  }

  // SYSTEM
  public async querySettings(): Promise<SystemSettings> {
    const settings = this.getTable<SystemSettings>('system_settings');
    return settings[0];
  }

  public async updateSettings(settings: SystemSettings): Promise<void> {
    this.saveTable('system_settings', [settings]);
  }

  // APP LOGIC
  public async queryInquiries(): Promise<Inquiry[]> {
    return this.getTable<Inquiry>('inquiries');
  }

  public async createInquiry(inquiry: Inquiry): Promise<void> {
    const inqs = this.getTable<Inquiry>('inquiries');
    this.saveTable('inquiries', [inquiry, ...inqs]);
  }

  public async querySavedProperties(userId: string): Promise<Property[]> {
    const user = this.getTable<User>('users').find(u => u.id === userId);
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

  public async queryMessages(userId: string): Promise<ChatMessage[]> {
    return this.getTable<ChatMessage>('messages').filter(m => m.senderId === userId || m.receiverId === userId);
  }

  public async queryOffers(userId: string): Promise<Offer[]> {
    return this.getTable<Offer>('offers').filter(o => o.buyerId === userId || o.sellerId === userId);
  }
}

export const db = VirtualPostgres.getInstance();
