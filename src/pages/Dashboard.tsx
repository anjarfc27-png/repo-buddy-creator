import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Store, Users, LogOut, Smartphone, BarChart3, Settings, FileText } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, isAdmin, loading, isAdminCheckComplete } = useAuth();
  const { currentStore } = useStore();

  // No auto redirect - show dashboard for all users

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    document.title = 'Dashboard - KasirQ POS';
  }, []);

  // Show loading while checking admin status
  if (loading || !isAdminCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // All approved users can see dashboard
  const miniData = [
    { name: 'Sen', value: 12 },
    { name: 'Sel', value: 18 },
    { name: 'Rab', value: 9 },
    { name: 'Kam', value: 22 },
    { name: 'Jum', value: 17 },
    { name: 'Sab', value: 25 },
    { name: 'Min', value: 14 },
  ];

  return (
    <div className="min-h-screen w-full">
      {/* iOS-like header dengan aksen biru */}
      <header className="bg-gradient-to-b from-primary/20 to-primary/5 pb-6 pt-[calc(env(safe-area-inset-top)+16px)]">
        <div className="max-w-md mx-auto px-4">
          <p className="text-xs text-muted-foreground">{currentStore?.name || 'Sistem Kasir'}</p>
          <h1 className="text-3xl font-bold tracking-tight">Selamat Datang</h1>
          <p className="text-sm text-muted-foreground">Pilih menu untuk mulai bekerja</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-6 space-y-4">
        {/* Analytics preview */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Ringkasan Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={miniData} margin={{ left: 0, right: 0, top: 4, bottom: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))' }} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick actions grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/pos')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <span>Kasir POS</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/ppob')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <span>PPOB</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/analytics')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <span>Dashboard Analytics</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/reports')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <span>Laporan</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/settings')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <span>Pengaturan Toko</span>
              </CardTitle>
            </CardHeader>
          </Card>

          {isAdmin && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/admin/users')}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <span>Admin Panel</span>
                </CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>

        {/* Logout Button */}
        <Button variant="outline" className="w-full" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Keluar
        </Button>

        <div className="pb-6" />
      </main>
    </div>
  );
};
