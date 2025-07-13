import { Link } from "react-router-dom";
import { Eye, Star, Heart } from "lucide-react";
import { useState } from "react";
import { ProductWithId } from "../services/firestore"; // ✅ Import shared type

interface ProductCardProps {
  product: ProductWithId; // ✅ Fix typing
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative bg-background rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <div className="bg-gradient-to-r from-hibhana-maroon/90 to-hibhana-maroon text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              NEW
            </div>
          )}
        </div>

        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold text-hibhana-black text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
            BEST SELLER
          </div>
        )}

        {/* Quick Actions */}
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            <Link 
              to={`/product/${product.id}`}
              className="transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100"
            >
              <button className="bg-white/90 hover:bg-white text-hibhana-black rounded-full p-3 transition-all duration-300 hover:scale-110">
                <Eye size={20} />
              </button>
            </Link>
            <button 
              className="transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 bg-white/90 hover:bg-white text-hibhana-black rounded-full p-3 hover:scale-110"
              aria-label="Add to wishlist"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg text-foreground hover:text-hibhana-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-hibhana-gold font-semibold text-lg">
            ₹{product.price.toLocaleString()}
          </p>

          {product.rating && (
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${
                    i < product.rating 
                      ? "text-hibhana-gold fill-hibhana-gold" 
                      : "text-gray-300"
                  } transition-colors duration-300`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-3">
          <Link 
            to={`/product/${product.id}`}
            className="inline-flex items-center text-sm font-medium text-foreground/80 hover:text-hibhana-gold transition-colors duration-300"
          >
            View Details
            <svg 
              className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
