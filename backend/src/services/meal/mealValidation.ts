/**
 * @summary
 * Validation schemas for Meal entity.
 * Centralizes all Zod validation logic for the service.
 *
 * @module services/meal/mealValidation
 */

import { z } from 'zod';
import { MEAL_TYPES, MEAL_UNITS, MEAL_LIMITS } from '@/constants/meal';
import { zDateString, zNullableString, zPositiveInt, zNonNegativeInt } from '@/utils/validation';

/**
 * Schema for meal item validation
 */
export const mealItemSchema = z.object({
  foodId: zPositiveInt.optional().nullable(),
  name: z.string().min(1).max(MEAL_LIMITS.FOOD_NAME_MAX_LENGTH),
  quantity: z.number().positive(),
  unit: z.enum([
    MEAL_UNITS.GRAM,
    MEAL_UNITS.MILLILITER,
    MEAL_UNITS.UNIT,
    MEAL_UNITS.SLICE,
    MEAL_UNITS.CUP,
    MEAL_UNITS.TABLESPOON,
    MEAL_UNITS.TEASPOON,
  ]),
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbohydrates: z.number().min(0),
  fats: z.number().min(0),
});

/**
 * Schema for create request validation
 */
export const createMealSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM)'),
  type: z.enum([MEAL_TYPES.BREAKFAST, MEAL_TYPES.LUNCH, MEAL_TYPES.DINNER, MEAL_TYPES.SNACK]),
  notes: z.string().max(MEAL_LIMITS.NOTES_MAX_LENGTH).optional().nullable(),
  photoUrl: z.string().url().optional().nullable(),
  items: z.array(mealItemSchema).min(1, 'At least one food item is required'),
});

/**
 * Schema for update request validation
 */
export const updateMealSchema = createMealSchema;

/**
 * Schema for ID parameter validation
 */
export const mealParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

/**
 * Schema for list query validation
 */
export const listQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
});

/**
 * Inferred types from schemas
 */
export type CreateMealInput = z.infer<typeof createMealSchema>;
export type UpdateMealInput = z.infer<typeof updateMealSchema>;
export type MealParamsInput = z.infer<typeof mealParamsSchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;
