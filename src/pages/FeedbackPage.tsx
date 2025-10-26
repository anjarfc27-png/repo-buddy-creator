import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const FeedbackPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      toast.error('Silakan tulis kritik atau saran Anda');
      return;
    }

    setLoading(true);
    
    // Simulate sending - will be functional after database migration
    setTimeout(() => {
      toast.info('Fitur kritik & saran akan aktif setelah migration database');
      setFeedback('');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background p-4 safe-top safe-bottom">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate('/')}
          className="rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Kritik & Saran</h1>
          <p className="text-sm text-muted-foreground">Bantu kami menjadi lebih baik</p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Sampaikan Pendapat Anda
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Kritik dan saran Anda sangat berharga untuk pengembangan aplikasi
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Pesan</Label>
              <Textarea
                id="feedback"
                placeholder="Tulis kritik, saran, atau masukan Anda di sini..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[200px] resize-none rounded-xl border-2 focus:border-primary"
                required
              />
              <p className="text-xs text-muted-foreground">
                {feedback.length} karakter
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl font-semibold"
              disabled={loading || !feedback.trim()}
            >
              {loading ? (
                'Mengirim...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Kritik & Saran
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="mt-4 border-primary/20 bg-primary/5">
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Tips:</strong> Jelaskan dengan detail agar kami bisa memahami dan meningkatkan layanan dengan lebih baik.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            * Fitur ini membutuhkan migration database untuk aktif
          </p>
        </CardContent>
      </Card>
    </div>
  );
};