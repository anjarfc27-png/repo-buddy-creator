import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StatsCardProps {
  title: string;
  amount: string;
  trend?: number;
  data?: { value: number }[];
}

export const StatsCard = ({ title, amount, trend, data }: StatsCardProps) => {
  const miniData = data || [
    { value: 12 },
    { value: 18 },
    { value: 9 },
    { value: 22 },
    { value: 17 },
    { value: 25 },
    { value: 14 },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-3xl font-bold">{amount}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                <span>+{trend}% dari kemarin</span>
              </div>
            )}
          </div>
          <div className="w-24 h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
