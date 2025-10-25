import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import { usePOSContext } from '@/contexts/POSContext';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { QuickActions } from '@/components/Dashboard/QuickActions';
import { MoreMenu } from '@/components/Dashboard/MoreMenu';
import { 
  DollarSign, 
  ShoppingCart, 
  Package,
  BarChart3,
  FileText,
  Settings,
  Users,
  LogOut,
  Calendar
} from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';

export const Dashboard = () => {
  const { user, isAdmin, loading } = useAuth();
  const { currentStore } = useStore();
  const { receipts, formatPrice } = usePOSContext();
  const navigate = useNavigate();

  const todayStats = useMemo(() => {
    const today = new Date().toDateString();
    const todayReceipts = receipts.filter(r => {
      const receiptDate = new Date(r.timestamp).toDateString();
      return receiptDate === today && !r.isManual && !r.id.startsWith('MNL-');
    });
    
    const revenue = todayReceipts.reduce((sum, r) => sum + r.total, 0);
    const profit = todayReceipts.reduce((sum, r) => sum + r.profit, 0);
    const transactions = todayReceipts.length;
    
    return { revenue, profit, transactions };
  }, [receipts]);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/pos');
    }
  }, [loading, isAdmin, navigate]);

  const handleLogout = async () => {
    try {
      const { signOut } = await import('@/contexts/AuthContext');
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const quickActions = [
    { 
      title: 'Kasir POS', 
      icon: ShoppingCart, 
      path: '/pos',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600'
    },
    { 
      title: 'PPOB', 
      icon: Package, 
      path: '/ppob',
      gradientFrom: 'from-emerald-500',
      gradientTo: 'to-teal-600'
    },
  ];

  const moreMenuItems = [
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: FileText, label: 'Laporan', path: '/reports' },
    { icon: Settings, label: 'Pengaturan', path: '/settings' },
    { icon: Users, label: 'Kelola User', path: '/admin/users', adminOnly: true },
    { icon: Calendar, label: 'Kelola Subscription', path: '/admin/subscriptions', adminOnly: true },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50/30 p-4 space-y-6 safe-top safe-bottom animate-fade-in-up">
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 rounded-2xl backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{currentStore?.name || 'Sistem Kasir'}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} className="h-10 w-10 hover:bg-red-500/10 hover:text-red-600">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatsCard title="Pendapatan" value={formatPrice(todayStats.revenue)} icon={DollarSign} trend="+12% vs kemarin" gradientFrom="from-blue-500" gradientTo="to-blue-600" />
        <StatsCard title="Profit" value={formatPrice(todayStats.profit)} icon={DollarSign} trend="+8% vs kemarin" gradientFrom="from-emerald-500" gradientTo="to-teal-600" />
        <StatsCard title="Transaksi" value={todayStats.transactions.toString()} icon={ShoppingCart} trend="Hari ini" gradientFrom="from-purple-500" gradientTo="to-pink-600" />
      </div>

      <QuickActions actions={quickActions} />
      <MoreMenu items={moreMenuItems} isAdmin={isAdmin} />
    </div>
  );
};
