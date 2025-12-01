/**
 * @summary
 * In-memory store instance for Meal entity.
 * Provides singleton pattern for data storage without database.
 *
 * @module instances/meal/mealStore
 */

import { MealRecord } from '@/services/meal/mealTypes';

/**
 * In-memory store for Meal records
 */
class MealStore {
  private records: Map<number, MealRecord> = new Map();
  private currentId: number = 0;

  /**
   * Get next available ID
   */
  getNextId(): number {
    this.currentId += 1;
    return this.currentId;
  }

  /**
   * Get all records
   */
  getAll(): MealRecord[] {
    return Array.from(this.records.values());
  }

  /**
   * Get record by ID
   */
  getById(id: number): MealRecord | undefined {
    return this.records.get(id);
  }

  /**
   * Add new record
   */
  add(record: MealRecord): MealRecord {
    this.records.set(record.id, record);
    return record;
  }

  /**
   * Update existing record
   */
  update(id: number, data: Partial<MealRecord>): MealRecord | undefined {
    const existing = this.records.get(id);
    if (!existing) {
      return undefined;
    }
    const updated = { ...existing, ...data };
    this.records.set(id, updated);
    return updated;
  }

  /**
   * Delete record by ID
   */
  delete(id: number): boolean {
    return this.records.delete(id);
  }

  /**
   * Check if record exists
   */
  exists(id: number): boolean {
    return this.records.has(id);
  }

  /**
   * Filter records by user and date
   */
  filter(userId: number, date: string): MealRecord[] {
    return Array.from(this.records.values()).filter(
      (record) => record.userId === userId && record.date === date
    );
  }
}

/**
 * Singleton instance of MealStore
 */
export const mealStore = new MealStore();
