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
    <Card className={`border-0 shadow-lg overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} animate-fade-in-up`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-white/90 font-medium">{title}</p>
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white mb-2 animate-count-up">{displayValue}</p>
        {trend && (
          <div className="flex items-center gap-1 text-white/80">
            {trend.includes('+') ? (
              <TrendingUp className="h-3 w-3" />
            ) : trend.includes('-') ? (
              <TrendingDown className="h-3 w-3" />
            ) : null}
            <p className="text-xs font-medium">{trend}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
