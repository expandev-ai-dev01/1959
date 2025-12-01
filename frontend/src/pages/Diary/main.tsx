import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus } from 'lucide-react';

import { useMealList, useMealActions } from '@/domain/meal/hooks';
import { DailySummary, MealCard, MealForm } from '@/domain/meal/components';
import type { Meal } from '@/domain/meal/types/models';

import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/core/components/sheet';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Empty, EmptyDescription, EmptyTitle } from '@/core/components/empty';

function DiaryPage() {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);

  const { data, isLoading, error } = useMealList(selectedDate);
  const { createMeal, updateMeal, deleteMeal } = useMealActions();

  const handleCreate = () => {
    setEditingMeal(null);
    setIsSheetOpen(true);
  };

  const handleEdit = (meal: Meal) => {
    setEditingMeal(meal);
    setIsSheetOpen(true);
  };

  const handleCopy = (meal: Meal) => {
    // Create a copy without ID and with current date/time
    const copy: any = {
      ...meal,
      id: undefined,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
      photo_url: '',
    };
    setEditingMeal(copy);
    setIsSheetOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteMeal.mutate(id);
  };

  const handleSubmit = (data: any) => {
    if (editingMeal && editingMeal.id) {
      updateMeal.mutate(
        { id: editingMeal.id, data },
        {
          onSuccess: () => setIsSheetOpen(false),
        }
      );
    } else {
      createMeal.mutate(data, {
        onSuccess: () => setIsSheetOpen(false),
      });
    }
  };

  return (
    <div className="space-y-8 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Diário Alimentar</h1>
          <p className="text-muted-foreground">Acompanhe suas refeições e metas diárias.</p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Refeição
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <div className="border-destructive/50 bg-destructive/10 text-destructive rounded-lg border p-4">
          Erro ao carregar refeições. Tente novamente.
        </div>
      ) : (
        <>
          {data?.summary && <DailySummary summary={data.summary} />}

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              Refeições de {format(parseISO(selectedDate), "d 'de' MMMM", { locale: ptBR })}
            </h2>

            {data?.meals && data.meals.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.meals.map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    onEdit={handleEdit}
                    onCopy={handleCopy}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <Empty>
                <EmptyTitle>Nenhuma refeição registrada</EmptyTitle>
                <EmptyDescription>
                  Clique em "Nova Refeição" para começar a registrar seu dia.
                </EmptyDescription>
              </Empty>
            )}
          </div>
        </>
      )}

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader className="mb-6">
            <SheetTitle>{editingMeal?.id ? 'Editar Refeição' : 'Nova Refeição'}</SheetTitle>
          </SheetHeader>
          <MealForm
            defaultValues={editingMeal || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsSheetOpen(false)}
            isSubmitting={createMeal.isPending || updateMeal.isPending}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export { DiaryPage };
