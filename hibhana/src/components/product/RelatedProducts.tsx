import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { ChevronRight } from "lucide-react";

interface RelatedProductsProps {
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    rating?: number;
    isNew?: boolean;
    isBestSeller?: boolean;
  }>;
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  if (products.length === 0) return null;
  
  return (
    <section className="mt-24 py-16 bg-gradient-to-b from-background/50 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div 
            className="text-center mb-16"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'fadeInUp 0.8s ease forwards'
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              You May Also Like
            </h2>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-hibhana-gold/50 via-hibhana-gold to-hibhana-gold/50 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: 'fadeInUp 0.8s ease forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div 
            className="text-center mt-12"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'fadeInUp 0.8s ease forwards',
              animationDelay: '0.4s'
            }}
          >
            <Link 
              to={`/collections/${products[0]?.category || 'indian'}`}
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-foreground transition-all duration-300 border border-border rounded-full hover:border-hibhana-gold hover:text-hibhana-gold hover:bg-hibhana-gold/5 group"
            >
              View All {products[0]?.category.charAt(0).toUpperCase() + products[0]?.category.slice(1) || 'Products'}
              <ChevronRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
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
    </section>
  );
};

export default RelatedProducts;
