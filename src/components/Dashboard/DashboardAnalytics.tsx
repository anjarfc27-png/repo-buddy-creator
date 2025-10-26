import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
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
      const transactions = monthReceipts.length;

      return {
        month: format(month, 'MMM yy', { locale: localeId }),
        revenue: Math.round(revenue),
        profit: Math.round(profit),
        transactions
      };
    });
  }, [receipts, timeRange]);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold">Analisis Penjualan</CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px] h-9 rounded-xl border-2">
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
      <CardContent className="space-y-6">
        {/* Revenue & Profit Chart */}
        <div>
          <p className="text-sm font-medium mb-3 text-muted-foreground">Pendapatan & Profit</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value: number) => formatPrice(value)}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                name="Pendapatan"
                dot={{ r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                name="Profit"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Chart */}
        <div>
          <p className="text-sm font-medium mb-3 text-muted-foreground">Jumlah Transaksi</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis 
                tick={{ fontSize: 11 }}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '12px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="transactions" 
                fill="hsl(var(--chart-3))" 
                radius={[8, 8, 0, 0]}
                name="Transaksi"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};