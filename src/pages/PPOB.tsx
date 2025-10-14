import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft,
  Plus,
  Smartphone, 
  Wifi, 
  Zap, 
  Wallet,
  CreditCard,
  Phone,
  Lightbulb,
  ShoppingBag,
  Tv,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const PPOB = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('beranda');
  const [depositAmount] = useState(0);

  // Kategori Prabayar
  const prabayarCategories = [
    { id: 'pulsa', name: 'Pulsa Seluler', icon: Smartphone },
    { id: 'paket-data', name: 'Paket Data', icon: Wifi },
    { id: 'token-listrik', name: 'Token Listrik', icon: Zap },
    { id: 'e-wallet', name: 'E-Wallet', icon: Wallet },
    { id: 'voucher', name: 'Voucher', icon: CreditCard },
  ];

  // Kategori Pascabayar
  const pascabayarCategories = [
    { id: 'telkom', name: 'Telkom', icon: Phone },
    { id: 'pln', name: 'PLN', icon: Lightbulb },
    { id: 'pulsa-pasca', name: 'Pulsa Pasca', icon: Smartphone },
    { id: 'pgn', name: 'PGN', icon: DollarSign },
    { id: 'pdam', name: 'PDAM', icon: ShoppingBag },
    { id: 'tv-kabel', name: 'TV Kabel', icon: Tv },
  ];

  const handleDeposit = () => {
    toast.info('Fitur deposit akan segera aktif');
  };

  const handleCategoryClick = (categoryId: string) => {
    toast.info(`Kategori ${categoryId} akan segera aktif setelah integrasi Digiflaz`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background safe-top safe-bottom">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary via-primary to-primary-light px-4 py-4 shadow-lg sticky top-0 z-10 safe-top">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/pos')}
              className="text-white hover:bg-white/20 h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-white">PPOB</h1>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => toast.info('Fitur atur harga akan segera aktif')}
            className="text-white hover:bg-white/20 text-sm"
          >
            Atur Harga
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b sticky top-[60px] z-10">
          <TabsList className="w-full h-12 bg-transparent rounded-none border-0 grid grid-cols-2">
            <TabsTrigger 
              value="beranda" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-medium"
            >
              BERANDA
            </TabsTrigger>
            <TabsTrigger 
              value="riwayat"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none font-medium"
            >
              RIWAYAT
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-4 space-y-4 pb-24">
          <TabsContent value="beranda" className="space-y-4 mt-0">
            {/* Deposit Card */}
            <Card className="border-0 shadow-md overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Deposit PPOB</p>
                    <p className="text-2xl font-bold">Rp {depositAmount.toLocaleString('id-ID')}</p>
                  </div>
                  <Button 
                    onClick={handleDeposit}
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-medium shadow-md"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Deposit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Banner Promo */}
            <Card className="border-0 shadow-md overflow-hidden bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="font-bold text-green-900">Tri EXTRA BENEFIT</h3>
                    <p className="text-sm text-green-800">Dapatkan Bonus Pulsa Nelpon Hingga</p>
                    <p className="text-lg font-bold text-orange-600">Rp 10.000,- dan Kuota Youtube Unlimited</p>
                    <p className="text-xs text-green-700">Syarat dan Ketentuan Berlaku</p>
                  </div>
                  <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prabayar Section */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">Prabayar</h2>
              <div className="grid grid-cols-4 gap-3">
                {prabayarCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-md">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-xs text-center font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pascabayar Section */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">Pascabayar</h2>
              <div className="grid grid-cols-4 gap-3">
                {pascabayarCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all active:scale-95"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-md">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <span className="text-xs text-center font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coming Soon Notice */}
            <Card className="border-2 border-dashed border-primary/50 bg-primary/5">
              <CardContent className="pt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Fitur PPOB akan segera tersedia setelah integrasi dengan Digiflaz
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="riwayat" className="space-y-4 mt-0">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Belum ada riwayat transaksi</p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Bottom Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg safe-bottom">
        <div className="max-w-6xl mx-auto">
          <Button 
            className="w-full h-14 bg-gradient-to-r from-primary to-primary-light hover:shadow-lg text-white font-bold text-lg rounded-2xl"
            onClick={() => toast.info('Fitur akan segera aktif')}
          >
            <span className="mr-2">0 Item</span>
            LANJUT
          </Button>
        </div>
      </div>
    </div>
  );
};
