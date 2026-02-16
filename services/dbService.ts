
import { Property } from '../types';
import { MOCK_PROPERTIES } from '../constants';

const DB_PREFIX = 'nuga_postgres_';
const MIGRATION_KEY = 'nuga_migrations';

export interface User {
  id: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  name: string;
  joinedDate: string;
}

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
    
    // Migration v1: Foundation
    if (!migrations.find(m => m.version === 1)) {
      console.log('Running Migration v1: DB Init...');
      
      const admin: User = {
        id: 'usr_admin_001',
        email: 'admin@nugabest.com',
        password: 'admin12345',
        role: 'admin',
        name: 'Nuga Executive',
        joinedDate: new Date().toISOString()
      };
      
      this.saveTable('users', [admin]);
      this.saveTable('properties', MOCK_PROPERTIES);
      this.saveTable('inquiries', []);
      
      this.recordMigration(1, 'Initial Schema Setup');
    }

    // Migration v2: Analytics & Metadata
    if (!migrations.find(m => m.version === 2)) {
      console.log('Running Migration v2: Adding Analytics Metadata...');
      // Logic for adding new columns or data indexing would go here
      this.recordMigration(2, 'Analytics Layer Integration');
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
    return new Promise(res => setTimeout(() => res(this.getTable<User>('users')), 300));
  }

  public async createUser(user: User): Promise<void> {
    const users = this.getTable<User>('users');
    this.saveTable('users', [...users, user]);
  }

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

  public async queryInquiries(): Promise<Inquiry[]> {
    return this.getTable<Inquiry>('inquiries');
  }

  public async createInquiry(inquiry: Inquiry): Promise<void> {
    const inqs = this.getTable<Inquiry>('inquiries');
    this.saveTable('inquiries', [inquiry, ...inqs]);
  }
}

export const db = VirtualPostgres.getInstance();
