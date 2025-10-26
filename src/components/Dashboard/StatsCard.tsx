import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  gradientFrom = 'from-blue-500',
  gradientTo = 'to-blue-600'
}: StatsCardProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    if (!isNaN(numericValue)) {
      const duration = 1000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(value.replace(/[0-9.,]+/, Math.floor(current).toLocaleString('id-ID')));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value]);
  
  return (
    <Card className="border shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted-foreground font-medium">{title}</p>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo}`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground mb-1">{displayValue}</p>
        {trend && (
          <div className="flex items-center gap-1 text-muted-foreground">
            {trend.includes('+') ? (
              <TrendingUp className="h-3 w-3 text-green-600" />
            ) : trend.includes('-') ? (
              <TrendingDown className="h-3 w-3 text-red-600" />
            ) : null}
            <p className="text-xs">{trend}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
