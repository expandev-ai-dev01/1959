/**
 * @summary
 * Default values and constants for Meal entity.
 * Defines allowed meal types and measurement units.
 *
 * @module constants/meal/mealDefaults
 */

/**
 * @interface MealTypesType
 * @description Available meal types.
 */
export const MEAL_TYPES = {
  BREAKFAST: 'Café da Manhã',
  LUNCH: 'Almoço',
  DINNER: 'Jantar',
  SNACK: 'Lanche',
} as const;

/** Type representing the MEAL_TYPES constant */
export type MealTypesType = typeof MEAL_TYPES;

/** Union type of all valid meal types */
export type MealType = (typeof MEAL_TYPES)[keyof typeof MEAL_TYPES];

/**
 * @interface MealUnitsType
 * @description Available measurement units for food items.
 */
export const MEAL_UNITS = {
  GRAM: 'g',
  MILLILITER: 'ml',
  UNIT: 'unidade',
  SLICE: 'fatia',
  CUP: 'xícara',
  TABLESPOON: 'colher de sopa',
  TEASPOON: 'colher de chá',
} as const;

/** Type representing the MEAL_UNITS constant */
export type MealUnitsType = typeof MEAL_UNITS;

/** Union type of all valid units */
export type MealUnit = (typeof MEAL_UNITS)[keyof typeof MEAL_UNITS];

/**
 * @interface MealLimitsType
 * @description Validation constraints for Meal entity fields.
 */
export const MEAL_LIMITS = {
  NOTES_MAX_LENGTH: 500,
  FOOD_NAME_MAX_LENGTH: 100,
} as const;
