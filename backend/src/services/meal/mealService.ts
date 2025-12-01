/**
 * @summary
 * Business logic for Meal entity.
 * Handles CRUD operations using in-memory storage.
 *
 * @module services/meal/mealService
 */

import { mealStore } from '@/instances';
import { ServiceError } from '@/utils';
import { MealRecord, MealListResponse, DailySummary, MealCreateRequest } from './mealTypes';
import {
  createMealSchema,
  updateMealSchema,
  mealParamsSchema,
  listQuerySchema,
} from './mealValidation';

/**
 * @summary
 * Lists all meals for a specific date and user, including nutritional summary.
 *
 * @function mealList
 * @module services/meal
 *
 * @param {number} userId - Authenticated user ID
 * @param {unknown} query - Query parameters containing date
 * @returns {Promise<MealListResponse>} List of meals and daily summary
 */
export async function mealList(userId: number, query: unknown): Promise<MealListResponse> {
  const validation = listQuerySchema.safeParse(query);

  if (!validation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Invalid query parameters',
      400,
      validation.error.errors
    );
  }

  const { date } = validation.data;
  const meals = mealStore.filter(userId, date);

  // Calculate summary
  const summary: DailySummary = meals.reduce(
    (acc, meal) => {
      meal.items.forEach((item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbohydrates += item.carbohydrates;
        acc.fats += item.fats;
      });
      return acc;
    },
    { calories: 0, protein: 0, carbohydrates: 0, fats: 0 }
  );

  // Sort by time
  meals.sort((a, b) => a.time.localeCompare(b.time));

  return {
    date,
    summary,
    meals,
  };
}

/**
 * @summary
 * Creates a new meal record.
 *
 * @function mealCreate
 * @module services/meal
 *
 * @param {number} userId - Authenticated user ID
 * @param {unknown} body - Request body
 * @returns {Promise<MealRecord>} Created meal record
 */
export async function mealCreate(userId: number, body: unknown): Promise<MealRecord> {
  const validation = createMealSchema.safeParse(body);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Validation failed', 400, validation.error.errors);
  }

  const params = validation.data;
  const now = new Date().toISOString();
  const id = mealStore.getNextId();

  const newMeal: MealRecord = {
    id,
    userId,
    date: params.date,
    time: params.time,
    type: params.type,
    notes: params.notes ?? null,
    photoUrl: params.photoUrl ?? null,
    items: params.items.map((item, index) => ({ ...item, id: index + 1 })),
    dateCreated: now,
    dateModified: now,
  };

  mealStore.add(newMeal);
  return newMeal;
}

/**
 * @summary
 * Retrieves a specific meal by ID.
 *
 * @function mealGet
 * @module services/meal
 *
 * @param {number} userId - Authenticated user ID
 * @param {unknown} params - Request params containing ID
 * @returns {Promise<MealRecord>} Found meal record
 */
export async function mealGet(userId: number, params: unknown): Promise<MealRecord> {
  const validation = mealParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const record = mealStore.getById(id);

  if (!record || record.userId !== userId) {
    throw new ServiceError('NOT_FOUND', 'Meal not found', 404);
  }

  return record;
}

/**
 * @summary
 * Updates an existing meal record.
 *
 * @function mealUpdate
 * @module services/meal
 *
 * @param {number} userId - Authenticated user ID
 * @param {unknown} params - Request params containing ID
 * @param {unknown} body - Request body
 * @returns {Promise<MealRecord>} Updated meal record
 */
export async function mealUpdate(
  userId: number,
  params: unknown,
  body: unknown
): Promise<MealRecord> {
  const paramsValidation = mealParamsSchema.safeParse(params);

  if (!paramsValidation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, paramsValidation.error.errors);
  }

  const bodyValidation = updateMealSchema.safeParse(body);

  if (!bodyValidation.success) {
    throw new ServiceError(
      'VALIDATION_ERROR',
      'Validation failed',
      400,
      bodyValidation.error.errors
    );
  }

  const { id } = paramsValidation.data;
  const existing = mealStore.getById(id);

  if (!existing || existing.userId !== userId) {
    throw new ServiceError('NOT_FOUND', 'Meal not found', 404);
  }

  const updateData = bodyValidation.data;
  const updated = mealStore.update(id, {
    date: updateData.date,
    time: updateData.time,
    type: updateData.type,
    notes: updateData.notes ?? null,
    photoUrl: updateData.photoUrl ?? null,
    items: updateData.items.map((item, index) => ({ ...item, id: index + 1 })),
    dateModified: new Date().toISOString(),
  });

  return updated as MealRecord;
}

/**
 * @summary
 * Deletes a meal record.
 *
 * @function mealDelete
 * @module services/meal
 *
 * @param {number} userId - Authenticated user ID
 * @param {unknown} params - Request params containing ID
 * @returns {Promise<{ message: string }>} Success message
 */
export async function mealDelete(userId: number, params: unknown): Promise<{ message: string }> {
  const validation = mealParamsSchema.safeParse(params);

  if (!validation.success) {
    throw new ServiceError('VALIDATION_ERROR', 'Invalid ID', 400, validation.error.errors);
  }

  const { id } = validation.data;
  const existing = mealStore.getById(id);

  if (!existing || existing.userId !== userId) {
    throw new ServiceError('NOT_FOUND', 'Meal not found', 404);
  }

  mealStore.delete(id);
  return { message: 'Deleted successfully' };
}
