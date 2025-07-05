import { Star, ShoppingBag, Ruler, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
    details: string[];
    rating?: number;
    isNew?: boolean;
    isBestSeller?: boolean;
    sizes?: string[];
    fabric?: string;
    image: string;
    featured?: boolean;
    collections?: boolean;
    collectionType?: string;
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-8">
      {/* ✅ Image Display */}
      <div className="w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-h-[500px] object-cover rounded-lg"
        />
      </div>

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
                  className={i < Math.floor(product.rating) ? "text-hibhana-gold fill-hibhana-gold" : "text-gray-300"}
                />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">{product.rating} / 5</span>
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
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Description */}
      <div>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
      </div>

      {/* Fabric */}
      {product.fabric && (
        <div>
          <h3 className="text-lg font-medium mb-2">Fabric</h3>
          <p className="text-muted-foreground">{product.fabric}</p>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Size</h3>
            <button className="text-sm text-hibhana-maroon hover:text-hibhana-gold transition-colors duration-300 flex items-center gap-1">
              <Ruler size={16} />
              Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 border rounded-lg transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-hibhana-gold text-white border-hibhana-gold shadow-lg shadow-hibhana-gold/20"
                    : "border-border hover:border-hibhana-gold hover:bg-hibhana-gold/5"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <h3 className="text-lg font-medium mb-4">Quantity</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-muted-foreground hover:text-hibhana-gold transition-colors duration-300"
            >
              -
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-muted-foreground hover:text-hibhana-gold transition-colors duration-300"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div>
        <h3 className="text-lg font-medium mb-4">Details</h3>
        <ul className="space-y-3 text-muted-foreground">
          {product.details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-hibhana-gold mt-1">•</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent"></div>

      {/* Actions */}
      <div className="space-y-4">
        <Link
          to="/appointment"
          className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background group"
        >
          <ShoppingBag size={20} className="mr-2" />
          Book Appointment for Custom Fitting
        </Link>
        <a
          href={`https://wa.me/919876543210?text=I'm interested in ${product.name} priced at ₹${product.price.toLocaleString()}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-medium tracking-wide text-foreground transition-all duration-300 border border-border rounded-full hover:border-hibhana-gold hover:text-hibhana-gold hover:bg-hibhana-gold/5"
        >
          Enquire on WhatsApp
        </a>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="flex items-center gap-3">
          <Truck className="text-hibhana-gold" size={24} />
          <div>
            <h4 className="font-medium">Free Shipping</h4>
            <p className="text-sm text-muted-foreground">On orders above ₹5,000</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="text-hibhana-gold" size={24} />
          <div>
            <h4 className="font-medium">Secure Payment</h4>
            <p className="text-sm text-muted-foreground">100% secure checkout</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RefreshCw className="text-hibhana-gold" size={24} />
          <div>
            <h4 className="font-medium">Easy Returns</h4>
            <p className="text-sm text-muted-foreground">30 days return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
