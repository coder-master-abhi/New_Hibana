import { Star, ShoppingBag, Ruler, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductWithId } from "../../services/firestore";

interface ProductInfoProps {
  product: ProductWithId;
}

// ...imports and interfaces stay the same

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8">

      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {product.isNew && (
            <span className="inline-block bg-gradient-to-r from-hibhana-maroon/90 to-hibhana-maroon text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              NEW
            </span>
          )}
          {product.isBestSeller && (
            <span className="inline-block bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold text-hibhana-black text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              BEST SELLER
            </span>
          )}
          {product.featured && (
            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
              FEATURED
            </span>
          )}
          {product.collections && (
            <span className="inline-block bg-pink-100 text-pink-800 text-xs font-medium px-3 py-1.5 rounded-full">
              COLLECTION
            </span>
          )}
          {product.collectionType && (
            <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full">
              {product.collectionType}
            </span>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold font-playfair tracking-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-4">
          {product.rating && (
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-hibhana-gold fill-hibhana-gold"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} / 5
              </span>
            </div>
          )}
          <button className="text-sm text-muted-foreground hover:text-hibhana-gold transition-colors duration-300 flex items-center gap-1">
            <Share2 size={16} />
            Share
          </button>
        </div>

        <p className="text-3xl text-hibhana-gold font-medium">
          ₹{product.price.toLocaleString()}
        </p>

        {/* ✅ Product Description */}
        {product.description && (
          <p className="text-base text-gray-300 mt-4 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

    </div>
  );
};
export default ProductInfo;
