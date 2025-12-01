import type { Meal } from '../../types/models';

export interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onCopy: (meal: Meal) => void;
  onDelete: (id: number) => void;
}
