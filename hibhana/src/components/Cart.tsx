import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Heart } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onMoveToWishlist }: CartProps) => {
  const [isAnimating, setIsAnimating] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsAnimating(id);
    onUpdateQuantity(id, newQuantity);
    setTimeout(() => setIsAnimating(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-bold font-playfair mb-8 text-center"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'fadeInUp 0.8s ease forwards'
            }}
          >
            Your Shopping Bag
          </h1>

          {items.length === 0 ? (
            <div 
              className="text-center py-16 space-y-6"
              style={{
                opacity: 0,
                transform: 'translateY(20px)',
                animation: 'fadeInUp 0.8s ease forwards',
                animationDelay: '0.2s'
              }}
            >
              <ShoppingBag size={64} className="mx-auto text-muted-foreground/50" />
              <h2 className="text-2xl font-medium text-muted-foreground">Your bag is empty</h2>
              <p className="text-muted-foreground">Looks like you haven't added anything to your bag yet.</p>
              <Link
                to="/collections"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background group"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className="bg-card rounded-lg shadow-sm border border-border/50 overflow-hidden group"
                    style={{
                      opacity: 0,
                      transform: 'translateY(20px)',
                      animation: 'fadeInUp 0.8s ease forwards',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex p-4">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-lg group-hover:text-hibhana-gold transition-colors duration-300">
                              {item.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-muted-foreground hover:text-hibhana-maroon transition-colors duration-300"
                            aria-label="Remove item"
                          >
                            <X size={20} />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-muted transition-colors duration-300"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className={`w-8 text-center ${isAnimating === item.id ? 'animate-pulse' : ''}`}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="p-1 rounded-full hover:bg-muted transition-colors duration-300"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-hibhana-gold">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                            <button
                              onClick={() => onMoveToWishlist(item.id)}
                              className="text-sm text-muted-foreground hover:text-hibhana-maroon transition-colors duration-300 flex items-center mt-1"
                            >
                              <Heart size={14} className="mr-1" />
                              Move to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div 
                className="lg:col-span-1"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'fadeInUp 0.8s ease forwards',
                  animationDelay: '0.4s'
                }}
              >
                <div className="bg-card rounded-lg shadow-sm border border-border/50 p-6 sticky top-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping.toLocaleString()}`}</span>
                    </div>
                    <div className="h-px bg-border my-4"></div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-hibhana-gold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Link
                      to="/checkout"
                      className="w-full inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background group"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/collections"
                      className="w-full inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-foreground transition-all duration-300 border border-border rounded-full hover:border-hibhana-gold hover:text-hibhana-gold"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  <div className="mt-6 text-sm text-muted-foreground">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Secure Checkout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Cart; 