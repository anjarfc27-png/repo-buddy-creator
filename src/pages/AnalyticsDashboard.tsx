import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStore } from "@/contexts/StoreContext";
import { ArrowLeft } from "lucide-react";
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
  const { loading, isAdminCheckComplete } = useAuth();
  const { currentStore } = useStore();

  useEffect(() => {
    document.title = "Analytics - KasirQ POS";
  }, []);

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
    <div className="min-h-screen w-full bg-background">
      <header className="bg-background pb-4 pt-[calc(env(safe-area-inset-top)+16px)] border-b">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <p className="text-xs text-muted-foreground">{currentStore?.name || "Sistem Kasir"}</p>
              <h1 className="text-2xl font-bold">Analytics</h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground pl-11">Ringkasan performa penjualan</p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <Card className="border-0 shadow-sm">
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

        <div className="pb-6" />
      </main>
    </div>
  );
};
