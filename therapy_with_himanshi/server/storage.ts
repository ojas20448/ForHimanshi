import {
  type User, type InsertUser,
  type Contact, type InsertContact,
  type Payment, type InsertPayment,
  type BookingToken, type InsertBookingToken,
  users, contacts, payments, bookingTokens
} from "../shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  updatePayment(orderId: string, data: Partial<Payment>): Promise<Payment | undefined>;
  createBookingToken(token: InsertBookingToken): Promise<BookingToken>;
  getBookingToken(token: string): Promise<BookingToken | undefined>;
  consumeBookingToken(token: string): Promise<BookingToken | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private payments: Map<string, Payment>;
  private bookingTokens: Map<string, BookingToken>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.payments = new Map();
    this.bookingTokens = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      id,
      razorpayOrderId: insertPayment.razorpayOrderId,
      razorpayPaymentId: insertPayment.razorpayPaymentId ?? null,
      razorpaySignature: insertPayment.razorpaySignature ?? null,
      amount: insertPayment.amount,
      currency: insertPayment.currency ?? "INR",
      status: insertPayment.status ?? "created",
      email: insertPayment.email ?? null,
      phone: insertPayment.phone ?? null,
      serviceName: insertPayment.serviceName,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.set(payment.razorpayOrderId, payment);
    return payment;
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    return this.payments.get(orderId);
  }

  async updatePayment(orderId: string, data: Partial<Payment>): Promise<Payment | undefined> {
    const payment = this.payments.get(orderId);
    if (!payment) return undefined;

    const updated: Payment = {
      ...payment,
      ...data,
      updatedAt: new Date(),
    };
    this.payments.set(orderId, updated);
    return updated;
  }

  async createBookingToken(insertToken: InsertBookingToken): Promise<BookingToken> {
    const id = randomUUID();
    const token: BookingToken = {
      ...insertToken,
      id,
      consumedAt: null,
      createdAt: new Date(),
    };
    this.bookingTokens.set(token.token, token);
    return token;
  }

  async getBookingToken(token: string): Promise<BookingToken | undefined> {
    const bookingToken = this.bookingTokens.get(token);
    if (!bookingToken) return undefined;

    if (new Date() > bookingToken.expiresAt) {
      return undefined;
    }

    return bookingToken;
  }

  async consumeBookingToken(token: string): Promise<BookingToken | undefined> {
    const bookingToken = this.bookingTokens.get(token);
    if (!bookingToken) return undefined;

    if (new Date() > bookingToken.expiresAt) {
      return undefined;
    }

    if (bookingToken.consumedAt) {
      return undefined;
    }

    const updated: BookingToken = {
      ...bookingToken,
      consumedAt: new Date(),
    };
    this.bookingTokens.set(token, updated);
    return updated;
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await db.insert(users).values({ ...insertUser, id }).returning();
    return user;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const [contact] = await db.insert(contacts).values({ ...insertContact, id, createdAt: new Date() }).returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const [payment] = await db.insert(payments).values({
      id,
      razorpayOrderId: insertPayment.razorpayOrderId,
      razorpayPaymentId: insertPayment.razorpayPaymentId ?? null,
      razorpaySignature: insertPayment.razorpaySignature ?? null,
      amount: insertPayment.amount,
      currency: insertPayment.currency ?? "INR",
      status: insertPayment.status ?? "created",
      email: insertPayment.email ?? null,
      phone: insertPayment.phone ?? null,
      serviceName: insertPayment.serviceName,
      upiScreenshot: insertPayment.upiScreenshot ?? null,
      transactionRef: insertPayment.transactionRef ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();
    return payment;
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.razorpayOrderId, orderId));
    return payment;
  }

  async updatePayment(orderId: string, data: Partial<Payment>): Promise<Payment | undefined> {
    const [payment] = await db.update(payments).set({
      ...data,
      updatedAt: new Date()
    }).where(eq(payments.razorpayOrderId, orderId)).returning();
    return payment;
  }

  async createBookingToken(insertToken: InsertBookingToken): Promise<BookingToken> {
    const id = randomUUID();
    const [token] = await db.insert(bookingTokens).values({
      ...insertToken,
      id,
      consumedAt: null,
      createdAt: new Date(),
    }).returning();
    return token;
  }

  async getBookingToken(token: string): Promise<BookingToken | undefined> {
    const [bookingToken] = await db.select().from(bookingTokens).where(eq(bookingTokens.token, token));
    if (!bookingToken) return undefined;
    if (new Date() > bookingToken.expiresAt) return undefined;
    return bookingToken;
  }

  async consumeBookingToken(token: string): Promise<BookingToken | undefined> {
    const [bookingToken] = await db.select().from(bookingTokens).where(eq(bookingTokens.token, token));
    if (!bookingToken) return undefined;
    if (new Date() > bookingToken.expiresAt) return undefined;
    if (bookingToken.consumedAt) return undefined;

    const [updated] = await db.update(bookingTokens).set({
      consumedAt: new Date()
    }).where(eq(bookingTokens.token, token)).returning();
    return updated;
  }
}

export class DynamicStorage implements IStorage {
  private dbStorage: DatabaseStorage;
  private memStorage: MemStorage;
  private isDbAvailable: boolean = false;
  private checked: boolean = false;

  constructor() {
    this.dbStorage = new DatabaseStorage();
    this.memStorage = new MemStorage();
    this.isDbAvailable = !!process.env.DATABASE_URL;
  }

  private async testDb(): Promise<boolean> {
    if (!this.isDbAvailable) return false;
    if (this.checked) return this.isDbAvailable;
    
    try {
      await db.execute(sql`SELECT 1`);
      this.checked = true;
      this.isDbAvailable = true;
      return true;
    } catch (e) {
      console.warn("Supabase database connection failed. Falling back to in-memory database.", e);
      this.isDbAvailable = false;
      this.checked = true;
      return false;
    }
  }

  async getUser(id: string) {
    if (await this.testDb()) {
      try { return await this.dbStorage.getUser(id); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.getUser(id);
  }

  async getUserByUsername(username: string) {
    if (await this.testDb()) {
      try { return await this.dbStorage.getUserByUsername(username); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.getUserByUsername(username);
  }

  async createUser(user: InsertUser) {
    if (await this.testDb()) {
      try { return await this.dbStorage.createUser(user); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.createUser(user);
  }

  async createContact(contact: InsertContact) {
    if (await this.testDb()) {
      try { return await this.dbStorage.createContact(contact); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.createContact(contact);
  }

  async getContacts() {
    if (await this.testDb()) {
      try { return await this.dbStorage.getContacts(); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.getContacts();
  }

  async createPayment(payment: InsertPayment) {
    if (await this.testDb()) {
      try { return await this.dbStorage.createPayment(payment); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.createPayment(payment);
  }

  async getPaymentByOrderId(orderId: string) {
    if (await this.testDb()) {
      try { return await this.dbStorage.getPaymentByOrderId(orderId); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.getPaymentByOrderId(orderId);
  }

  async updatePayment(orderId: string, data: Partial<Payment>) {
    if (await this.testDb()) {
      try { return await this.dbStorage.updatePayment(orderId, data); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.updatePayment(orderId, data);
  }

  async createBookingToken(token: InsertBookingToken) {
    if (await this.testDb()) {
      try { return await this.dbStorage.createBookingToken(token); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.createBookingToken(token);
  }

  async getBookingToken(token: string) {
    if (await this.testDb()) {
      try { return await this.dbStorage.getBookingToken(token); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.getBookingToken(token);
  }

  async consumeBookingToken(token: string) {
    if (await this.testDb()) {
      try { return await this.dbStorage.consumeBookingToken(token); } catch { this.isDbAvailable = false; }
    }
    return this.memStorage.consumeBookingToken(token);
  }
}

export const storage = new DynamicStorage();
