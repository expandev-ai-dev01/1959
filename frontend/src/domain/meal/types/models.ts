export type MealType = 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';

export type Unit = 'g' | 'ml' | 'unidade' | 'fatia' | 'xícara' | 'colher de sopa' | 'colher de chá';

export interface MealItem {
  meal_food_id?: string;
  food_id?: string | null;
  name: string;
  quantity: number;
  unit: Unit;
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
}

export interface Meal {
  id: number;
  user_id: string;
  date: string;
  time: string;
  type: MealType;
  notes?: string;
  photo_url?: string;
  items: MealItem[];
  total_calories: number;
  total_protein: number;
  total_carbohydrates: number;
  total_fats: number;
}

export interface DailySummary {
  calories: number;
  protein: number;
  carbohydrates: number;
  fats: number;
}

export interface MealListResponse {
  summary: DailySummary;
  meals: Meal[];
}
