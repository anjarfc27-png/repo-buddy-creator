<<<<<<< HEAD
import { lazy, ComponentType } from 'react';

// Retry function for failed dynamic imports with proper typing
const retryImport = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>, 
  retries = 3, 
  delay = 1000
): Promise<{ default: T }> => {
  return importFn().catch((error) => {
    if (retries === 0) {
      throw error;
    }
    
    console.log(`Retrying import... (${retries} attempts left)`);
    return new Promise<{ default: T }>((resolve) => {
      setTimeout(() => {
        resolve(retryImport(importFn, retries - 1, delay));
      }, delay);
    });
  });
};

// Lazy load heavy components with retry logic to improve initial load time
export const LazyProductGrid = lazy(() => 
  retryImport(() => import('../POS/ProductGrid').then(module => ({ default: module.ProductGrid })))
);

export const LazyShoppingCart = lazy(() => 
  retryImport(() => import('../POS/ShoppingCart').then(module => ({ default: module.ShoppingCart })))
);

export const LazyReceipt = lazy(() => 
  retryImport(() => import('../POS/Receipt').then(module => ({ default: module.Receipt })))
);

export const LazyAddProductForm = lazy(() => 
  retryImport(() => import('../POS/AddProductForm'))
);

export const LazySalesReport = lazy(() => 
  retryImport(() => import('../POS/SalesReport').then(module => ({ default: module.SalesReport })))
);

export const LazyStockManagement = lazy(() => 
  retryImport(() => import('../POS/StockManagement').then(module => ({ default: module.StockManagement })))
);

export const LazyReceiptHistory = lazy(() => 
  retryImport(() => import('../POS/ReceiptHistory').then(module => ({ default: module.ReceiptHistory })))
);

export const LazyQuickInvoice = lazy(() => 
  retryImport(() => import('../POS/QuickInvoice').then(module => ({ default: module.QuickInvoice })))
);

export const LazyShoppingList = lazy(() => 
  retryImport(() => import('../POS/ShoppingList').then(module => ({ default: module.ShoppingList })))
);

export const LazyBluetoothManager = lazy(() => 
  retryImport(() => import('../POS/BluetoothManager').then(module => ({ default: module.BluetoothManager })))
);
=======
import { lazy } from 'react';

// Lazy load heavy components to improve initial load time
export const LazyProductGrid = lazy(() => import('../POS/ProductGrid').then(module => ({ default: module.ProductGrid })));
export const LazyShoppingCart = lazy(() => import('../POS/ShoppingCart').then(module => ({ default: module.ShoppingCart })));
export const LazyReceipt = lazy(() => import('../POS/Receipt').then(module => ({ default: module.Receipt })));
export const LazyAddProductForm = lazy(() => import('../POS/AddProductForm').then(module => ({ default: module.AddProductForm })));
export const LazySalesReport = lazy(() => import('../POS/SalesReport').then(module => ({ default: module.SalesReport })));
export const LazyManualReceiptReport = lazy(() => import('../Reports/ManualReceiptReport').then(module => ({ default: module.ManualReceiptReport })));
export const LazyStockManagement = lazy(() => import('../POS/StockManagement').then(module => ({ default: module.StockManagement })));
export const LazyReceiptHistory = lazy(() => import('../POS/ReceiptHistory').then(module => ({ default: module.ReceiptHistory })));
export const LazyManualInvoice = lazy(() => import('../POS/ManualInvoice').then(module => ({ default: module.ManualInvoice })));
export const LazyShoppingList = lazy(() => import('../POS/ShoppingList').then(module => ({ default: module.ShoppingList })));
export const LazyBluetoothManager = lazy(() => import('../POS/BluetoothManager').then(module => ({ default: module.BluetoothManager })));
>>>>>>> sumber/main

// Loading fallback component
export const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);