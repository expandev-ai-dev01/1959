import { MoreHorizontal, Pencil, Trash2, Copy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/components/card';
import { Button } from '@/core/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/core/components/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/core/components/alert-dialog';
import type { MealCardProps } from './types';

function MealCard({ meal, onEdit, onCopy, onDelete }: MealCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/20 flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="grid gap-1">
          <CardTitle className="text-base font-semibold">
            {meal.time} - {meal.type}
          </CardTitle>
          <CardDescription>
            {meal.total_calories.toFixed(0)} kcal • P: {meal.total_protein.toFixed(1)}g • C:{' '}
            {meal.total_carbohydrates.toFixed(1)}g • G: {meal.total_fats.toFixed(1)}g
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(meal)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onCopy(meal)}>
              <Copy className="mr-2 h-4 w-4" />
              Copiar
            </DropdownMenuItem>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso excluirá permanentemente o registro da
                    refeição.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(meal.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Excluir
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="grid gap-3">
          {meal.items.map((item, index) => (
            <li key={index} className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground">
                {item.quantity} {item.unit}
              </span>
            </li>
          ))}
        </ul>
        {meal.notes && (
          <div className="bg-muted text-muted-foreground mt-4 rounded-md p-3 text-sm">
            {meal.notes}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { MealCard };
