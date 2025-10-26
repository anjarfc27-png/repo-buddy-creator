import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeedbackManagement = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 safe-top safe-bottom">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/admin')}
          className="rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Kritik & Saran</h1>
          <p className="text-sm text-muted-foreground">Kelola feedback dari user</p>
        </div>
      </div>

      {/* Stats */}
      <Card className="mb-6 border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-light">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">-</p>
              <p className="text-sm text-muted-foreground">Total Feedback</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-0 shadow-sm">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <p className="mb-2">Fitur kritik & saran akan aktif setelah migration database dijalankan</p>
          <p className="text-xs">Tabel feedbacks perlu dibuat terlebih dahulu</p>
        </CardContent>
      </Card>
    </div>
  );
};