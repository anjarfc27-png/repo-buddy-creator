import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  path: string;
  gradient?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 gap-4">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Card
            key={action.path}
            className="cursor-pointer hover:shadow-md transition-all active:scale-95 border-0 shadow-sm"
            onClick={() => navigate(action.path)}
          >
            <CardHeader className="p-6">
              <CardTitle className="flex flex-col items-center gap-3 text-center">
                <div className={`p-4 rounded-2xl ${action.gradient || 'bg-primary/10'}`}>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-base font-semibold">{action.label}</span>
              </CardTitle>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};
