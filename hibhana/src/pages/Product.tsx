
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products";
import WhatsAppButton from "../components/WhatsAppButton";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductSkeleton from "../components/product/ProductSkeleton";

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      // Simulate loading delay for better UX
      setTimeout(() => {
        const productData = getProductById(id);
        if (productData) {
          setProduct(productData);
          setRelatedProducts(getRelatedProducts(id, productData.category));
        }
        setLoading(false);
      }, 800);
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <ProductSkeleton />;
  }

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
          {/* Product Gallery */}
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
          />

          {/* Product Info */}
          <ProductInfo product={product} />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default Product;
