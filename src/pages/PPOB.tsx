import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Smartphone, 
  Zap, 
  Tv, 
  Wifi, 
  Droplets, 
  Car,
  CreditCard,
  Wallet,
  ArrowLeft,
  Store,
  Search,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const PPOB = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('pulsa');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock categories (nanti connect ke Digiflaz API)
  const categories = [
    { id: 'pulsa', name: 'Pulsa', icon: Smartphone, color: 'bg-blue-500' },
    { id: 'paket-data', name: 'Paket Data', icon: Wifi, color: 'bg-purple-500' },
    { id: 'pln', name: 'Token PLN', icon: Zap, color: 'bg-yellow-500' },
    { id: 'tv', name: 'TV Kabel', icon: Tv, color: 'bg-red-500' },
    { id: 'pdam', name: 'PDAM', icon: Droplets, color: 'bg-cyan-500' },
    { id: 'e-wallet', name: 'E-Wallet', icon: Wallet, color: 'bg-green-500' },
    { id: 'voucher', name: 'Voucher Game', icon: CreditCard, color: 'bg-pink-500' },
    { id: 'bpjs', name: 'BPJS', icon: Car, color: 'bg-orange-500' },
  ];

  const handleTransaction = (productName: string) => {
    toast.info('Fitur PPOB akan segera aktif setelah integrasi dengan Digiflaz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-primary to-primary-light p-6 shadow-lg">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-white">
              <h1 className="text-2xl font-bold">PPOB</h1>
              <p className="text-sm text-white/80">Payment Point Online Bank</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate('/pos')}
            className="bg-white text-primary hover:bg-white/90"
          >
            <Store className="h-4 w-4 mr-2" />
            Kasir POS
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Coming Soon Badge with animation */}
        <Card className="border-2 border-dashed border-primary/50 bg-gradient-to-r from-primary/10 to-primary/5 animate-fade-in">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Badge variant="secondary" className="text-sm animate-pulse">
                Coming Soon - Integrasi Digiflaz
              </Badge>
              <p className="text-sm text-muted-foreground">
                Fitur PPOB akan segera tersedia setelah pendaftaran ke Digiflaz
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Search with animation */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Cari produk atau layanan..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base shadow-sm border-2 focus:border-primary transition-all"
          />
        </div>

        {/* Categories Grid with stagger animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 animate-fade-in border-0 shadow-md"
                style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                onClick={() => setActiveTab(category.id)}
              >
                <CardContent className="pt-6 pb-4 text-center space-y-3">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg transform transition-transform hover:rotate-6`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-semibold text-sm">{category.name}</p>
                  <ChevronRight className="h-4 w-4 mx-auto text-muted-foreground" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Product Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-8">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-3">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-card to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg ${category.color} shadow-md`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {/* Mock products */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-all duration-300 hover:scale-102 border-0 shadow-md animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                      <CardContent className="pt-4 pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="font-semibold text-base">{category.name} {i * 5}.000</p>
                            <p className="text-sm text-primary font-medium mt-1">
                              Rp {(i * 5000 + 500).toLocaleString('id-ID')}
                            </p>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleTransaction(`${category.name} ${i * 5}.000`)}
                            disabled
                            className="bg-gradient-to-r from-primary to-primary-light hover:shadow-md transition-all"
                          >
                            Beli
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="text-center py-12 text-muted-foreground">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <category.icon className="h-8 w-8" />
                  </div>
                  <p className="text-base font-medium">Produk akan tersedia setelah integrasi dengan Digiflaz</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      </div>
    </div>
  );
};
