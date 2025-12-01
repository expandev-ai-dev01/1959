import { useQuery } from '@tanstack/react-query';
import { mealService } from '../../services/mealService';

export const useMealList = (date: string) => {
  return useQuery({
    queryKey: ['meals', date],
    queryFn: () => mealService.list(date),
  });
};
