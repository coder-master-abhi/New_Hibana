import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

import { ProductWithId } from "../services/firestore"; // ✅ Correct type

import WhatsAppButton from "../components/WhatsAppButton";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";

import RelatedProducts from "../components/product/RelatedProducts";
import ProductSkeleton from "../components/product/ProductSkeleton";

export default function Product() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductWithId | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() } as ProductWithId;
          setProduct(productData);

          // ✅ Now this will not give error because productData is typed
          const q = query(
            collection(db, "products"),
            where("category", "==", productData.category)
          );

          const querySnapshot = await getDocs(q);

          const related = querySnapshot.docs
            .filter((doc) => doc.id !== id)
            .map((doc) => ({ id: doc.id, ...doc.data() } as ProductWithId));

          setRelatedProducts(related);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Product not found</p>
          <Link to="/collections/indian" className="btn-primary mt-6">
            View Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full pt-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20">
        {/* Breadcrumb Navigation */}
        <nav className="mb-10 flex items-center space-x-2 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-hibhana-gold transition-colors duration-300">Home</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-hibhana-gold transition-colors duration-300">Collections</Link>
          <span>/</span>
          <Link 
            to={`/collections/${product.category?.toLowerCase()}`} 
            className="hover:text-hibhana-gold transition-colors duration-300"
          >
            {product.category?.charAt(0).toUpperCase() + product.category?.slice(1) || 'Products'}
          </Link>
          <span>/</span>
          <span className="text-gray-300 truncate max-w-[150px]">{product.name}</span>
        </nav>
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Product Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery
              images={product.images?.length ? product.images : [product.image]}
              productName={product.name}
            />
          </div>
          
          {/* Product Info */}
          <div>
            <ProductInfo product={product!} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <WhatsAppButton />
    </div>
  );
}
