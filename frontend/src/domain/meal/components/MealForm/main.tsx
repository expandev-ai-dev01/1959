import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

import { mealSchema, mealTypes } from '../../validations/meal';
import type { MealFormInput, MealFormOutput } from '../../types/forms';
import { FoodItemForm } from '../FoodItemForm';

import { Button } from '@/core/components/button';
import { Input } from '@/core/components/input';
import { Textarea } from '@/core/components/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/core/components/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/core/components/dialog';
import { Card, CardContent } from '@/core/components/card';

interface MealFormProps {
  defaultValues?: Partial<MealFormInput>;
  onSubmit: (data: MealFormOutput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

function MealForm({ defaultValues, onSubmit, onCancel, isSubmitting }: MealFormProps) {
  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);

  const form = useForm<MealFormInput, any, MealFormOutput>({
    resolver: zodResolver(mealSchema),
    mode: 'onBlur',
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      time: format(new Date(), 'HH:mm'),
      type: 'Café da Manhã',
      items: [],
      notes: '',
      photo_url: '',
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const handleAddFood = (foodItem: any) => {
    append(foodItem);
    setIsFoodDialogOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hora</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Refeição</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mealTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>Alimentos</FormLabel>
            <Dialog open={isFoodDialogOpen} onOpenChange={setIsFoodDialogOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Alimento
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Alimento</DialogTitle>
                </DialogHeader>
                <FoodItemForm
                  onSubmit={handleAddFood}
                  onCancel={() => setIsFoodDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {form.formState.errors.items && (
            <p className="text-destructive text-sm font-medium">
              {form.formState.errors.items.message}
            </p>
          )}

          <div className="space-y-2">
            {fields.map((field, index) => (
              <Card key={field.id} className="bg-muted/40">
                <CardContent className="flex items-center justify-between p-3">
                  <div className="grid gap-1">
                    <span className="font-medium">{field.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {field.quantity} {field.unit} • {field.calories} kcal
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
            {fields.length === 0 && (
              <div className="text-muted-foreground rounded-md border border-dashed p-8 text-center text-sm">
                Nenhum alimento adicionado.
              </div>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Como você estava se sentindo?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Refeição'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export { MealForm };
