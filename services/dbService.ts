
import { Property, Appointment, ChatMessage, Offer, User, Inquiry, Transaction, SystemSettings } from '../types';
import { MOCK_PROPERTIES } from '../constants';

const DB_PREFIX = 'nuga_postgres_';
const MIGRATION_KEY = 'nuga_migrations';

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
      console.log('Running Migration v1: Super Admin Init...');
      
      const admin: User = {
        id: 'usr_admin_001',
        email: 'admin@nugabest.com',
        password: 'admin12345',
        role: 'admin',
        name: 'Nuga Executive CEO',
        joinedDate: new Date().toISOString(),
        savedPropertyIds: [],
        status: 'active',
        verified: true,
        kycStatus: 'verified',
        subscriptionPlan: 'enterprise'
      };

      const demoAgent: User = {
        id: 'usr_agent_001',
        email: 'agent@nugabest.com',
        password: 'password123',
        role: 'agent',
        name: 'John Realtor',
        joinedDate: new Date().toISOString(),
        savedPropertyIds: [],
        status: 'active',
        verified: true,
        kycStatus: 'pending',
        subscriptionPlan: 'pro'
      };
      
      this.saveTable('users', [admin, demoAgent]);
      
      const propsWithOwners = MOCK_PROPERTIES.map(p => ({
        ...p,
        ownerId: p.id.startsWith('sale') ? 'usr_admin_001' : 'usr_agent_001',
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
      this.saveTable('appointments', []);
      this.saveTable('messages', []);
      this.saveTable('offers', []);
      
      this.saveTable('transactions', [
        { id: 'tx_1', userId: 'usr_agent_001', amount: 25000, currency: '₦', type: 'Subscription', status: 'Completed', timestamp: new Date().toISOString(), description: 'Pro Plan Monthly' },
        { id: 'tx_2', userId: 'usr_agent_001', amount: 5000, currency: '₦', type: 'Listing Boost', status: 'Completed', timestamp: new Date().toISOString(), description: 'Boost: Banana Island Mansion' }
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
      
      this.recordMigration(1, 'Super Admin Schema Upgrade');
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

  // USER MANAGEMENT
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

  // PROPERTY MANAGEMENT
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

  // TRANSACTIONS
  public async queryTransactions(): Promise<Transaction[]> {
    return this.getTable<Transaction>('transactions');
  }

  // SETTINGS
  public async querySettings(): Promise<SystemSettings> {
    const settings = this.getTable<SystemSettings>('system_settings');
    return settings[0];
  }

  public async updateSettings(settings: SystemSettings): Promise<void> {
    this.saveTable('system_settings', [settings]);
  }

  // OTHER MODULES
  public async queryInquiries(): Promise<Inquiry[]> {
    return this.getTable<Inquiry>('inquiries');
  }

  public async createInquiry(inquiry: Inquiry): Promise<void> {
    const inqs = this.getTable<Inquiry>('inquiries');
    this.saveTable('inquiries', [inquiry, ...inqs]);
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

  public async queryMessages(userId: string): Promise<ChatMessage[]> {
    return this.getTable<ChatMessage>('messages').filter(m => m.senderId === userId || m.receiverId === userId);
  }

  public async queryOffers(userId: string): Promise<Offer[]> {
    return this.getTable<Offer>('offers').filter(o => o.buyerId === userId || o.sellerId === userId);
  }
}

export const db = VirtualPostgres.getInstance();
