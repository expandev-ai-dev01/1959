import { authenticatedClient } from '@/core/lib/api';
import type { MealListResponse, Meal } from '../types/models';
import type { MealFormOutput } from '../types/forms';

/**
 * @service MealService
 * @domain Meal
 */
export const mealService = {
  async list(date: string): Promise<MealListResponse> {
    const { data } = await authenticatedClient.get('/meal', { params: { date } });
    return data.data;
  },

  async create(meal: MealFormOutput): Promise<Meal> {
    const { data } = await authenticatedClient.post('/meal', meal);
    return data.data;
  },

  async update(id: number, meal: MealFormOutput): Promise<Meal> {
    const { data } = await authenticatedClient.put(`/meal/${id}`, meal);
    return data.data;
  },

  async delete(id: number): Promise<void> {
    await authenticatedClient.delete(`/meal/${id}`);
  },

  async get(id: number): Promise<Meal> {
    const { data } = await authenticatedClient.get(`/meal/${id}`);
    return data.data;
  },
};
