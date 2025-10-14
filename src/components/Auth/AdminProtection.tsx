import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
<<<<<<< HEAD
import { useStore } from '@/contexts/StoreContext';
=======
>>>>>>> sumber/main

interface AdminProtectionProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
<<<<<<< HEAD
  useSettingsPassword?: boolean; // Add flag to use settings password instead
=======
>>>>>>> sumber/main
}

export const AdminProtection = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
<<<<<<< HEAD
  title = "Autentikasi Admin Diperlukan",
  description = "Masukkan kata sandi admin untuk melanjutkan",
  useSettingsPassword = false
=======
  title = "Admin Authentication Required",
  description = "Masukkan kata sandi admin untuk melanjutkan"
>>>>>>> sumber/main
}: AdminProtectionProps) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
  const { currentStore } = useStore();

  // Use settings password or admin password based on prop
  const REQUIRED_PASSWORD = useSettingsPassword 
    ? ((currentStore as any)?.settings_password || '12234566')
    : ((currentStore as any)?.admin_password || '122344566');
=======

  const ADMIN_PASSWORD = '122344566';
>>>>>>> sumber/main

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for security
    await new Promise(resolve => setTimeout(resolve, 500));

<<<<<<< HEAD
    console.log('Password check:', { entered: password, required: REQUIRED_PASSWORD, useSettings: useSettingsPassword });

    if (password === REQUIRED_PASSWORD) {
      const successMsg = useSettingsPassword ? 'Akses pengaturan berhasil!' : 'Akses admin berhasil!';
      toast.success(successMsg);
      setPassword('');
      setError('');
      setIsLoading(false);
      onSuccess();
      // Don't auto-close, let parent component handle it
    } else {
      const errorMsg = useSettingsPassword ? 'Kode pengaturan salah!' : 'Kata sandi admin salah!';
      setError(errorMsg);
      setIsLoading(false);
    }
=======
    if (password === ADMIN_PASSWORD) {
      toast.success('Akses admin berhasil!');
      onSuccess();
      onClose();
      setPassword('');
    } else {
      setError('Kata sandi admin salah!');
    }
    
    setIsLoading(false);
>>>>>>> sumber/main
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
<<<<<<< HEAD
      <DialogContent className="sm:max-w-md mx-auto rounded-2xl shadow-2xl">
=======
      <DialogContent className="sm:max-w-md">
>>>>>>> sumber/main
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
<<<<<<< HEAD
            <Label htmlFor="adminPassword">
              {useSettingsPassword ? 'Kode Pengaturan' : 'Kata Sandi Admin'}
            </Label>
=======
            <Label htmlFor="adminPassword">Kata Sandi Admin</Label>
>>>>>>> sumber/main
            <Input
              id="adminPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              placeholder={useSettingsPassword ? 'Masukkan kode pengaturan' : 'Masukkan kata sandi admin'}
=======
              placeholder="Masukkan kata sandi admin"
>>>>>>> sumber/main
              required
              autoFocus
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Memverifikasi...' : 'Masuk'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};