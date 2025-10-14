import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
<<<<<<< HEAD
  appId: 'app.kasirq.pos',
  appName: 'KasirQ - POS',
  webDir: 'dist',
  // iOS status bar configuration
  ios: {
    contentInset: 'always'
  },
  // Android status bar configuration  
  android: {
    backgroundColor: '#00ACC1',
    allowMixedContent: true
  },
  // Note: server.url dihapus agar APK memuat aset lokal (tidak membuka situs Lovable)
  // Untuk live-reload saat development, bisa sementara tambahkan kembali:
  // server: {
  //   url: 'https://2e18c95d-191f-4517-aba9-ef9096017fc0.lovableproject.com?forceHideBadge=true',
  //   cleartext: true
  // },
=======
  appId: 'app.lovable.2e18c95d191f4517aba9ef9096017fc0',
  appName: 'anjarpos5-22',
  webDir: 'dist',
  server: {
    url: 'https://2e18c95d-191f-4517-aba9-ef9096017fc0.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
>>>>>>> sumber/main
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;