import { Star, Ruler, Share2, Heart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductWithId } from "../../services/firestore";

interface ProductInfoProps {
  product: ProductWithId;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const [isWishlisted, setIsWishlisted] = useState(false);
  
  return (
    <div className="space-y-8 px-5 md:px-10 py-8 md:py-10 bg-background/30 backdrop-blur-sm rounded-2xl border border-white/5 shadow-xl">
      {/* Badge Section */}
      <div className="flex flex-wrap items-center gap-3 mb-2">
        {product.isNew && (
          <span className="inline-block bg-gradient-to-r from-hibhana-maroon/90 to-hibhana-maroon text-white text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="inline-block bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold text-hibhana-black text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm">
            BEST SELLER
          </span>
        )}
        {product.featured && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            FEATURED
          </span>
        )}
        {product.collections && (
          <span className="inline-block bg-pink-100 text-pink-800 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            COLLECTION
          </span>
        )}
        {product.collectionType && (
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            {product.collectionType}
          </span>
        )}
      </div>

      {/* Title Section */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold font-playfair tracking-tight text-white">
          {product.name}
        </h1>

        {/* Price and Actions Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-3xl text-hibhana-gold font-semibold">
            ₹{product.price.toLocaleString()}
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full transition-all duration-300 ${isWishlisted ? 'bg-hibhana-maroon/20 text-hibhana-maroon' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            >
              <Heart size={18} className={isWishlisted ? "fill-hibhana-maroon" : ""} />
              <span className="text-sm font-semibold">Wishlist</span>
            </button>
            
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300">
              <Share2 size={18} />
              <span className="text-sm font-semibold">Share</span>
            </button>
          </div>
        </div>

        {/* Rating Section */}
        {product.rating && (
          <div className="flex items-center gap-3 bg-white/5 px-5 py-3.5 rounded-xl">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-hibhana-gold fill-hibhana-gold"
                      : "text-gray-400"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-white">
              {product.rating} / 5
            </span>
            <span className="text-xs font-medium text-gray-400 ml-1">
              ({Math.floor(Math.random() * 100) + 50} reviews)
            </span>
          </div>
        )}

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"></div>

        {/* Description Section */}
        {product.description && (
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-white">Description</h3>
            <p className="text-base text-gray-300 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>
        )}

        {/* Fabric Section */}
        {product.fabric && (
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-semibold text-white">Fabric</h3>
            <p className="text-base text-gray-300 font-medium">
              {product.fabric}
            </p>
          </div>
        )}

        {/* Sizes Section */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Available Sizes</h3>
              <button className="text-sm text-hibhana-gold flex items-center gap-1.5 hover:underline font-medium">
                <Ruler size={16} />
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-5 py-3 text-sm font-medium rounded-lg border ${selectedSize === size 
                    ? 'border-hibhana-gold text-hibhana-gold bg-hibhana-gold/10' 
                    : 'border-gray-600 text-gray-300 hover:border-gray-400'} 
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-hibhana-gold/30`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Details Section */}
        {product.details && product.details.length > 0 && (
          <div className="space-y-4 mt-8 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white">Product Details</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {product.details.map((item, index) => (
                <li key={index} className="flex items-start gap-2.5 text-gray-300">
                  <span className="text-hibhana-gold mt-1 text-lg">•</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
