import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/card';
import type { DailySummary as DailySummaryType } from '../../types/models';

interface DailySummaryProps {
  summary: DailySummaryType;
}

function DailySummary({ summary }: DailySummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Calorias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.calories.toFixed(0)} kcal</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Proteínas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.protein.toFixed(1)} g</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Carboidratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.carbohydrates.toFixed(1)} g</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gorduras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.fats.toFixed(1)} g</div>
        </CardContent>
      </Card>
    </div>
  );
}

export { DailySummary };
