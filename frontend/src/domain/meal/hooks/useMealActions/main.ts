import { useMutation, useQueryClient } from '@tanstack/react-query';
import { mealService } from '../../services/mealService';
import { toast } from 'sonner';

export const useMealActions = () => {
  const queryClient = useQueryClient();

  const createMeal = useMutation({
    mutationFn: mealService.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meals', variables.date] });
      toast.success('Refeição registrada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao registrar refeição.');
    },
  });

  const updateMeal = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => mealService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['meals', variables.data.date] });
      toast.success('Refeição atualizada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao atualizar refeição.');
    },
  });

  const deleteMeal = useMutation({
    mutationFn: mealService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast.success('Refeição excluída com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao excluir refeição.');
    },
  });

  return {
    createMeal,
    updateMeal,
    deleteMeal,
  };
};
