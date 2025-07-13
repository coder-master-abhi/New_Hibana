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
    <div className="min-h-screen w-full pt-24">
      <div className="container mx-auto py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ✅ Product Gallery */}
          <ProductGallery
            images={product.images?.length ? product.images : [product.image]}
            productName={product.name}
          />
          {/* ✅ Product Info */}

         <ProductInfo product={product!} />
        </div>

        {/* ✅ Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      <WhatsAppButton />
    </div>
  );
}
