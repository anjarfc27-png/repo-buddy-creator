<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useStore } from '@/contexts/StoreContext';
import { StoreSelector } from '@/components/Store/StoreSelector';
=======
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
>>>>>>> sumber/main
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
<<<<<<< HEAD
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { toast as sonnerToast } from 'sonner';
import { Store } from '@/types/store';
import { MessageCircle, Instagram, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import kasirqLogo from '@/assets/kasirq-logo.png';

export const LoginPage = () => {
  const { signIn, signInWithUsername, signUp, loading, user } = useAuth();
  const { currentStore } = useStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminContacts, setAdminContacts] = useState<{ whatsapp?: string; instagram?: string }>({});
  
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: ''
  });
  
  const [signUpData, setSignUpData] = useState({
    email: '',
    username: '',
    whatsappNumber: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState<string>('');
  const [showStoreSelector, setShowStoreSelector] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch admin contact info
  useEffect(() => {
    const fetchAdminContacts = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('admin_whatsapp, admin_instagram')
          .eq('email', 'tokoanjar09@gmail.com')
          .maybeSingle();
        
        if (data) {
          setAdminContacts({
            whatsapp: (data as any).admin_whatsapp,
            instagram: (data as any).admin_instagram
          });
        }
      } catch (error) {
        console.error('Error fetching admin contacts:', error);
      }
    };

    fetchAdminContacts();
  }, []);

  const handleWhatsAppContact = () => {
    if (adminContacts.whatsapp) {
      const message = encodeURIComponent('Halo, saya ingin mengajukan pendaftaran atau mencoba trial 1 bulan.');
      window.open(`https://wa.me/${adminContacts.whatsapp}?text=${message}`, '_blank');
    }
  };

  const handleInstagramContact = () => {
    if (adminContacts.instagram) {
      window.open(`https://instagram.com/${adminContacts.instagram}`, '_blank');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');
    
    // Detect if input is email or username
    const isEmail = loginData.identifier.includes('@');
    
    const { error } = isEmail 
      ? await signIn(loginData.identifier, loginData.password)
      : await signInWithUsername(loginData.identifier, loginData.password);
      
    if (error) {
      // Convert error messages to Indonesian
      let errorMessage = 'Login gagal';
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Email/Username atau password salah';
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = 'Email belum dikonfirmasi. Silakan cek email Anda';
      } else if (error.message?.includes('menunggu persetujuan')) {
        // Redirect to waiting approval page
        navigate('/waiting-approval');
        return;
      } else if (error.message?.includes('Username tidak ditemukan')) {
        errorMessage = 'Username tidak ditemukan';
      }
      setErrors(errorMessage);
    } else {
      // Show store selector after successful login
      setShowStoreSelector(true);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setErrors('Password tidak cocok');
      return;
    }

    if (signUpData.password.length < 6) {
      setErrors('Password minimal 6 karakter');
      return;
    }

    if (!signUpData.whatsappNumber.trim()) {
      setErrors('Nomor WhatsApp wajib diisi');
      return;
    }

    // Show loading state
    sonnerToast.loading('Mendaftar...', { id: 'signup-loading' });

    const { error } = await signUp(signUpData.email, signUpData.username, signUpData.password, signUpData.whatsappNumber);
    
    // Dismiss loading
    sonnerToast.dismiss('signup-loading');
    
    if (error) {
      // Handle specific error messages in Indonesian
      let errorMessage = 'Pendaftaran gagal';
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        errorMessage = 'Email atau username sudah terdaftar';
      } else if (error.message?.includes('invalid email')) {
        errorMessage = 'Format email tidak valid';
      } else if (error.message?.includes('weak password')) {
        errorMessage = 'Password terlalu lemah';
      }
      setErrors(errorMessage);
      sonnerToast.error(errorMessage);
    } else {
      sonnerToast.success(
        'Pendaftaran berhasil!',
        {
          description: 'Silakan cek email Anda untuk konfirmasi (maksimal 15 menit), lalu tunggu approval admin',
          duration: 7000
        }
      );
      setErrors('');
      // Clear form
      setSignUpData({
        email: '',
        username: '',
        whatsappNumber: '',
        password: '',
        confirmPassword: ''
      });
      // Redirect to waiting approval page
      navigate('/waiting-approval');
    }
  };

  const handleStoreSelected = (store: Store) => {
    navigate('/');
  };

  // Show store selector if user is logged in but no store selected yet
  if (user && !currentStore) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="w-full max-w-4xl">
          <StoreSelector onStoreSelected={handleStoreSelected} />
        </div>
=======
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Clock, Store } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export const LoginPage = () => {
  const { signIn, signInWithUsername, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    if (user && !loading) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
>>>>>>> sumber/main
      </div>
    );
  }

<<<<<<< HEAD
  // If user is logged in and has a store, redirect to main page
  if (user && currentStore) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={kasirqLogo} alt="KasirQ Logo" className="w-16 h-16" />
            <h1 className="text-3xl font-bold text-primary">KasirQ</h1>
          </div>
          <CardTitle className="text-2xl font-bold">Kasir Multi Toko</CardTitle>
          <CardDescription>
            Sistem kasir untuk berbagai jenis toko
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Daftar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="identifier">Email atau Username</Label>
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Masukkan email atau username"
                    value={loginData.identifier}
                    onChange={(e) => setLoginData(prev => ({ ...prev, identifier: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                
                {errors && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Masuk...' : 'Masuk'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={signUpData.username}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, username: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp-number">Nomor WhatsApp (format: 6281234567890)</Label>
                  <Input
                    id="whatsapp-number"
                    type="tel"
                    placeholder="628xxxxxxxxxx"
                    value={signUpData.whatsappNumber}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: 62 diikuti nomor HP (tanpa 0 di depan)
                  </p>
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      minLength={6}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
                
                {errors && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors}</AlertDescription>
                  </Alert>
                )}
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Mendaftar...' : 'Daftar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Floating Contact Buttons */}
      {(adminContacts.whatsapp || adminContacts.instagram) && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          {adminContacts.whatsapp && (
            <Button
              onClick={handleWhatsAppContact}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform"
              title="Hubungi via WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          )}
          {adminContacts.instagram && (
            <Button
              onClick={handleInstagramContact}
              size="lg"
              variant="outline"
              className="rounded-full h-14 w-14 shadow-lg hover:scale-110 transition-transform"
              title="Hubungi via Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
=======
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if outside operating hours and validate access code
    if (!isOperatingHours()) {
      if (accessCode !== '165432') {
        setError('Kode akses diperlukan untuk login diluar jam operasional');
        setIsLoading(false);
        return;
      }
    }

    let result;
    if (formData.email.includes('@')) {
      result = await signIn(formData.email, formData.password);
    } else {
      result = await signInWithUsername(formData.email, formData.password);
    }
    
    if (result.error) {
      setError(result.error.message);
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await signUp(formData.email, formData.username, formData.password);
    if (error) {
      setError(error.message);
    } else {
      toast.success('Pendaftaran berhasil. Silakan cek email untuk konfirmasi.');
      setShowSignUp(false);
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const redirectTo = `${window.location.origin}/login`;
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo,
      });
      if (error) throw error;
      toast.success('Email reset password telah dikirim. Periksa inbox Anda.');
      setShowForgotPassword(false);
      setResetEmail('');
    } catch (error: any) {
      setError(error.message || 'Terjadi kesalahan saat mengirim email reset password');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if current time is within operating hours (06:00 - 17:00)
  const isOperatingHours = () => {
    const currentHour = currentTime.getHours();
    return currentHour >= 6 && currentHour < 17;
  };

  // Format time to Indonesian locale
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (showSignUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Daftar Akun</CardTitle>
            <CardDescription>
              Buat akun baru untuk menggunakan aplikasi kasir
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@contoh.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newUsername">Username</Label>
                <Input
                  id="newUsername"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Mendaftarkan...' : 'Daftar'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => { setShowSignUp(false); setError(''); }}
                >
                  Kembali ke Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Lupa Password</CardTitle>
            <CardDescription>
              Masukkan email untuk reset password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resetEmail">Email</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Mengirim...' : 'Kirim Email Reset'}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError('');
                    setResetEmail('');
                  }}
                >
                  Kembali ke Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <div className="text-left">
              <CardTitle className="text-xl font-bold text-foreground">Kasir Toko Anjar</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Sistem Point of Sale
              </CardDescription>
            </div>
          </div>
          
          {/* Status Toko dan Waktu */}
          <div className="space-y-2">
            <div className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-all duration-500 ${
              isOperatingHours() 
                ? 'bg-green-500/10 border-green-500/20 animate-fade-in' 
                : 'bg-red-500/10 border-red-500/20 animate-fade-in'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full animate-pulse ${
                  isOperatingHours() ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <span className={`text-xs font-semibold ${
                  isOperatingHours() ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                }`}>
                  {isOperatingHours() ? 'TOKO BUKA' : 'TOKO TUTUP'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-center px-4 py-2 bg-muted/30 rounded-lg border">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-primary" />
                <span className="font-mono text-sm font-medium">
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            {formatDate(currentTime)}
          </div>
          
          {/* Development Note */}
         {/* <div className="mt-4 p-3 bg-info/10 border border-info/20 rounded-lg">
          {/*  <p className="text-xs text-muted-foreground text-center">
              💡 <strong>Tips:</strong> Untuk testing yang lebih cepat, nonaktifkan "Confirm email" 
              di Supabase Dashboard → Auth → Settings
            </p>
          </div> */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Email atau Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  email: e.target.value 
                })}
                placeholder="Masukkan email atau username"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Masukkan password"
                className="h-11"
                required
              />
            </div>

            {!isOperatingHours() && (
              <div className="space-y-2">
                <Label htmlFor="accessCode" className="text-sm font-medium">Kode Akses</Label>
                <Input
                  id="accessCode"
                  type="password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Masukkan kode akses"
                  className="h-11"
                  required
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-3 pt-2">
              <Button 
                type="submit" 
                className="w-full h-11 bg-gradient-to-r from-primary to-primary-light hover:from-primary/90 hover:to-primary-light/90" 
                disabled={isLoading || (!isOperatingHours() && !accessCode)}
              >
                {isLoading ? 'Memproses...' : 'Masuk ke Sistem'}
              </Button>
              
              {!isOperatingHours() && (
                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full h-11 border-orange-500 text-orange-700 hover:bg-orange-50 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-950" 
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    setAccessCode('165432'); // Set access code automatically
                    setTimeout(() => {
                      const form = e.currentTarget.closest('form');
                      if (form) {
                        form.requestSubmit();
                      }
                    }, 100);
                  }}
                >
                  ⚠️ Paksa Login (Diluar Jam Operasional)
                </Button>
              )}
              
              <div className="flex gap-2">
               {/*  <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 text-sm" 
                  onClick={() => { setShowSignUp(true); setError(''); }}
                >
                  Daftar Akun
                </Button> */}
              
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="flex-1 text-sm text-muted-foreground hover:text-primary" 
                  onClick={() => setShowForgotPassword(true)}
                >
                  Lupa Password?
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
>>>>>>> sumber/main
