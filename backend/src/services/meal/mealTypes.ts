/**
 * @summary
 * Type definitions for Meal entity.
 *
 * @module services/meal/mealTypes
 */

import { MealType, MealUnit } from '@/constants/meal';

/**
 * @interface MealItem
 * @description Represents a food item within a meal
 */
export interface MealItem {
  id?: number;
  foodId?: number | null;
  name: string;
  quantity: number;
  unit: MealUnit;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
}

/**
 * @interface MealRecord
 * @description Represents a meal record entity
 */
export interface MealRecord {
  id: number;
  userId: number;
  date: string;
  time: string;
  type: MealType;
  notes: string | null;
  photoUrl: string | null;
  items: MealItem[];
  dateCreated: string;
  dateModified: string;
}

/**
 * @interface MealCreateRequest
 * @description Request payload for creating a meal
 */
export interface MealCreateRequest {
  date: string;
  time: string;
  type: MealType;
  notes?: string | null;
  photoUrl?: string | null;
  items: MealItem[];
}

/**
 * @interface MealUpdateRequest
 * @description Request payload for updating a meal
 */
export interface MealUpdateRequest extends MealCreateRequest {}

/**
 * @interface DailySummary
 * @description Nutritional summary for the day
 */
export interface DailySummary {
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
}

/**
 * @interface MealListResponse
 * @description Response structure for listing meals with summary
 */
export interface MealListResponse {
  date: string;
  summary: DailySummary;
  meals: MealRecord[];
}
