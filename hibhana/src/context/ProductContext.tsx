import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllProducts } from '../services/firestore';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  featured: boolean;
  collections: boolean;
  collectionType?: string;
  description?: string;
  image: string;
  indianWear: boolean;
  westernWear: boolean;
};



type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  refreshProducts: () => Promise<void>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await getAllProducts();
      setProducts(productsData as Product[]);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const value = {
    products,
    loading,
    error,
    setProducts,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}