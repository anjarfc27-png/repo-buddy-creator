import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useSupabasePOS } from '@/hooks/useSupabasePOS';
import { usePOS } from '@/hooks/usePOS';
import { CartItem, Product, Receipt } from '@/types/pos';
import { useAuth } from '@/contexts/AuthContext';

interface POSContextType {
  products: Product[];
  cart: CartItem[];
  receipts: Receipt[];
  loading?: boolean;
  addProduct: (product: Omit<Product, 'id'>) => void | Promise<void>;
  updateProduct: (productId: string, updates: Partial<Product>) => void | Promise<void>;
  deleteProduct?: (productId: string) => void | Promise<void>;
  addToCart: (product: Product, quantity?: number, customPrice?: number) => void;
  updateCartQuantity: (productId: string, quantity: number, finalPrice?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  processTransaction: (paymentMethod?: string, discount?: number) => Receipt | null | Promise<Receipt | null>;
  addManualReceipt: (receipt: Receipt) => void | Promise<void>;
  formatPrice: (price: number) => string;
}

const POSContext = createContext<POSContextType | undefined>(undefined);

export const POSProvider = ({ children }: { children: ReactNode }) => {
  // Safely get auth context with null checks
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.warn('Auth context not available, using local storage');
    authContext = { user: null };
  }
  
  const { user } = authContext;
  const supabasePOS = useSupabasePOS();
  const localPOS = usePOS();

  // Always use Supabase when user is logged in for real-time sync
  const currentPOS = user ? supabasePOS : localPOS;

  const addManualReceipt = async (receipt: Receipt) => {
    if (user && supabasePOS.addManualReceipt) {
      await supabasePOS.addManualReceipt(receipt);
      return;
    }
    localPOS.addManualReceipt?.(receipt);
  };

  // Ensure all cart operations use the current POS system
  const contextValue: POSContextType = {
    products: currentPOS.products,
    cart: currentPOS.cart,
    receipts: currentPOS.receipts,
    loading: user ? supabasePOS.loading : false,
    addProduct: currentPOS.addProduct,
    updateProduct: currentPOS.updateProduct,
    deleteProduct: currentPOS.deleteProduct,
    addToCart: currentPOS.addToCart,
    updateCartQuantity: currentPOS.updateCartQuantity,
    removeFromCart: currentPOS.removeFromCart,
    clearCart: currentPOS.clearCart,
    processTransaction: currentPOS.processTransaction,
    addManualReceipt,
    formatPrice: currentPOS.formatPrice,
  };

  return (
    <POSContext.Provider value={contextValue}>
      {children}
    </POSContext.Provider>
  );
};

export const usePOSContext = () => {
  const context = useContext(POSContext);
  if (context === undefined) {
    throw new Error('usePOSContext must be used within a POSProvider');
  }
  return context;
};