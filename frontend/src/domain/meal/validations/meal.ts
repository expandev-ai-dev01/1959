import { z } from 'zod';

export const mealTypes = ['Café da Manhã', 'Almoço', 'Jantar', 'Lanche'] as const;
export const units = [
  'g',
  'ml',
  'unidade',
  'fatia',
  'xícara',
  'colher de sopa',
  'colher de chá',
] as const;

export const mealItemSchema = z.object({
  meal_food_id: z.string().optional(),
  food_id: z.string().nullable().optional(),
  name: z
    .string('Nome do alimento é obrigatório')
    .min(1, 'Nome do alimento não pode ser vazio')
    .max(100, 'Nome muito longo'),
  quantity: z.number('Quantidade obrigatória').min(0.01, 'Quantidade deve ser maior que zero'),
  unit: z.enum(units, 'Selecione uma unidade válida'),
  calories: z.number('Calorias obrigatórias').min(0, 'Não pode ser negativo'),
  protein: z.number('Proteína obrigatória').min(0, 'Não pode ser negativo'),
  carbohydrates: z.number('Carboidratos obrigatórios').min(0, 'Não pode ser negativo'),
  fats: z.number('Gorduras obrigatórias').min(0, 'Não pode ser negativo'),
});

export const mealSchema = z.object({
  id: z.number().optional(),
  date: z
    .string('Data é obrigatória')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)'),
  time: z.string('Hora é obrigatória').regex(/^\d{2}:\d{2}$/, 'Formato inválido (HH:MM)'),
  type: z.enum(mealTypes, 'Selecione um tipo de refeição'),
  notes: z.string().max(500, 'Máximo de 500 caracteres').optional(),
  photo_url: z.string().url('URL inválida').optional().or(z.literal('')),
  items: z.array(mealItemSchema).min(1, 'Adicione pelo menos um alimento'),
});
