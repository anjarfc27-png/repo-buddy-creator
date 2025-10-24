import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Store, Users, LogOut, Smartphone, BarChart3, Settings, FileText } from 'lucide-react';
import { useStore } from '@/contexts/StoreContext';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { QuickActions } from '@/components/Dashboard/QuickActions';
import { MoreMenu } from '@/components/Dashboard/MoreMenu';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut, isAdmin, loading, isAdminCheckComplete } = useAuth();
  const { currentStore } = useStore();

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Quick action buttons for main features
  const quickActions = [
    { icon: Store, label: 'Kasir POS', path: '/pos' },
    { icon: Smartphone, label: 'PPOB', path: '/ppob' },
  ];

  // More menu items
  const moreMenuItems = [
    { icon: BarChart3, label: 'Dashboard Analytics', path: '/analytics' },
    { icon: FileText, label: 'Laporan', path: '/reports' },
    { icon: Settings, label: 'Pengaturan Toko', path: '/settings' },
    { icon: Users, label: 'Admin Panel', path: '/admin/users', adminOnly: true },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Clean iOS-style header */}
      <header className="bg-background pb-4 pt-[calc(env(safe-area-inset-top)+16px)] border-b">
        <div className="max-w-md mx-auto px-4">
          <p className="text-xs text-muted-foreground">{currentStore?.name || 'Sistem Kasir'}</p>
          <h1 className="text-2xl font-bold">Selamat Datang</h1>
          <p className="text-sm text-muted-foreground">Pilih menu untuk mulai bekerja</p>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Stats card with mini chart */}
        <StatsCard 
          title="Penjualan Hari Ini"
          amount="Rp 2.450.000"
          trend={12}
        />

        {/* 2 Primary Actions */}
        <QuickActions actions={quickActions} />

        {/* Collapsible More Menu */}
        <MoreMenu items={moreMenuItems} isAdmin={isAdmin} />

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full h-12 rounded-xl"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Keluar
        </Button>

        <div className="pb-6" />
      </main>
    </div>
  );
};

