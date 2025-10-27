import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState, useMemo } from 'react';
import { usePOSContext } from '@/contexts/POSContext';
import { format, subMonths, startOfMonth, endOfMonth, eachMonthOfInterval } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export const DashboardAnalytics = () => {
  const { receipts, formatPrice } = usePOSContext();
  const [timeRange, setTimeRange] = useState<string>('1');

  const analyticsData = useMemo(() => {
    const months = parseInt(timeRange);
    const endDate = new Date();
    const startDate = subMonths(endDate, months - 1);

    const monthsInterval = eachMonthOfInterval({ start: startDate, end: endDate });

    return monthsInterval.map(month => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const monthReceipts = receipts.filter(r => {
        const receiptDate = new Date(r.timestamp);
        return receiptDate >= monthStart && receiptDate <= monthEnd && !r.isManual;
      });

      const revenue = monthReceipts.reduce((sum, r) => sum + r.total, 0);
      const profit = monthReceipts.reduce((sum, r) => sum + r.profit, 0);

      return {
        month: format(month, 'MMM yy', { locale: localeId }),
        revenue: Math.round(revenue),
        profit: Math.round(profit),
      };
    });
  }, [receipts, timeRange]);

  return (
    <Card className="border shadow-sm bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold">Analisis Penjualan</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px] sm:w-[140px] h-8 sm:h-9 rounded-xl border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Bulan</SelectItem>
              <SelectItem value="2">2 Bulan</SelectItem>
              <SelectItem value="3">3 Bulan</SelectItem>
              <SelectItem value="6">6 Bulan</SelectItem>
              <SelectItem value="12">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div>
          <p className="text-xs sm:text-sm font-medium mb-3 text-muted-foreground">Pendapatan & Profit</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={analyticsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 10 }}
                stroke="hsl(var(--foreground))"
                opacity={0.7}
              />
              <YAxis 
                tick={{ fontSize: 9 }}
                stroke="hsl(var(--foreground))"
                opacity={0.7}
                width={35}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value.toString();
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--popover))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '11px'
                }}
                formatter={(value: number) => formatPrice(value)}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(217 91% 60%)" 
                strokeWidth={2.5}
                name="Pendapatan"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(142 76% 36%)" 
                strokeWidth={2.5}
                name="Profit"
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
