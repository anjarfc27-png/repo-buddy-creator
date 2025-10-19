import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/contexts/StoreContext";
import {
  Store,
  Smartphone,
  BarChart3,
  Settings,
  FileText,
  Users,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const { loading, isAdminCheckComplete, isAdmin } = useAuth();
  const { currentStore } = useStore();

  useEffect(() => {
    document.title = "Analytics - KasirQ POS";
  }, []);

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

  // Sample data placeholder; replace with real stats later
  const weekly = [
    { name: "Sen", total: 12 },
    { name: "Sel", total: 18 },
    { name: "Rab", total: 9 },
    { name: "Kam", total: 22 },
    { name: "Jum", total: 17 },
    { name: "Sab", total: 25 },
    { name: "Min", total: 14 },
  ];

  return (
    <div className="min-h-screen w-full">
      <header className="bg-gradient-to-b from-primary/20 to-primary/5 pb-6 pt-[calc(env(safe-area-inset-top)+16px)]">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs text-muted-foreground">{currentStore?.name || "Sistem Kasir"}</p>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-muted-foreground">Ringkasan performa penjualan</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 -mt-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Penjualan 7 Hari</CardTitle>
          </CardHeader>
          <CardContent className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/pos") }>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Store className="h-6 w-6 text-primary" />
                </div>
                <span>Kasir POS</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/ppob") }>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <span>PPOB</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/reports") }>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <span>Laporan</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/settings") }>
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
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/admin/users")}>
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

        <div className="pb-8" />
      </main>
    </div>
  );
};
