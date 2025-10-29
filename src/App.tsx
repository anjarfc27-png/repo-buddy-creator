import React, { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { POSInterface } from "@/components/POS/POSInterface";
import { CartView } from "./pages/CartView";
import { ReportsPage } from "./pages/ReportsPage";
import { StoreSettings } from "./pages/StoreSettings";
import { Dashboard } from "./pages/Dashboard";
import { BackupRestorePage } from "./pages/BackupRestorePage";
import NotFound from "./pages/NotFound";
import { POSProvider } from "@/contexts/POSContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { StoreProvider } from "@/contexts/StoreContext";
import { BluetoothProvider } from "@/contexts/BluetoothContext";
import { LoginPage } from "@/components/Auth/LoginPage";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { AdminRoute } from "@/components/Auth/AdminRoute";
import { UserManagement } from "@/components/Admin/UserManagement";
import { WaitingApproval } from "@/pages/WaitingApproval";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FeedbackPage } from "@/pages/FeedbackPage";
import { FeedbackManagement } from "@/pages/admin/FeedbackManagement";
import { SubscriptionManagement } from "@/pages/admin/SubscriptionManagement";
import { PPOB } from "@/pages/PPOB";
import { AnalyticsDashboard } from "@/pages/AnalyticsDashboard";
import { ScrollToTop } from "@/components/ScrollToTop";

import { useAuth } from "@/contexts/AuthContext";

// Create QueryClient outside component to prevent recreation on every render
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

const AppRoutes = () => {
  const { loading, isAdminCheckComplete, isAdmin } = useAuth();
  
  // Faster loading check
  if (loading || !isAdminCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent mx-auto"></div>
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/pos" element={
          <ProtectedRoute>
            <POSInterface />
          </ProtectedRoute>
        } />
        <Route path="/ppob" element={
          <ProtectedRoute>
            <PPOB />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <CartView />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <StoreSettings />
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        } />
        <Route path="/admin/subscriptions" element={
          <AdminRoute>
            <SubscriptionManagement />
          </AdminRoute>
        } />
        <Route path="/admin/feedbacks" element={
          <AdminRoute>
            <FeedbackManagement />
          </AdminRoute>
        } />
        <Route path="/feedback" element={
          <ProtectedRoute>
            <FeedbackPage />
          </ProtectedRoute>
        } />
        <Route path="/backup-restore" element={
          <AdminRoute>
            <BackupRestorePage />
          </AdminRoute>
        } />
        <Route path="/waiting-approval" element={<WaitingApproval />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
      StatusBar.setStyle({ style: Style.Light }).catch(() => {});
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StoreProvider>
            
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <POSProvider>
                <BluetoothProvider>
                  <AppRoutes />
                </BluetoothProvider>
              </POSProvider>
            </BrowserRouter>
          </StoreProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
