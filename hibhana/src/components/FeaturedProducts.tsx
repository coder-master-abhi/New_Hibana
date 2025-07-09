import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FeaturedProducts = () => {
  const { products, loading } = useProducts();

  // Filter only featured products
  const featured = products.filter((product) => product.featured === true);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 font-playfair tracking-tight"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeInUp 0.8s ease forwards",
            }}
          >
            Featured Collection
          </h2>
          <div
            className="h-1 w-32 mx-auto bg-gradient-to-r from-hibhana-gold/50 via-hibhana-gold to-hibhana-gold/50 rounded-full"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.2s",
            }}
          ></div>
          <p
            className="mt-8 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              animation: "fadeInUp 0.8s ease forwards",
              animationDelay: "0.4s",
            }}
          >
            Discover our most sought-after pieces, showcasing the perfect blend of tradition and contemporary design.
          </p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse bg-background rounded-lg overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[3/4] bg-muted/50"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted/50 rounded w-3/4"></div>
                  <div className="h-4 bg-muted/50 rounded w-1/4"></div>
                  <div className="h-4 bg-muted/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div
          className="text-center mt-16"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            animation: "fadeInUp 0.8s ease forwards",
            animationDelay: "0.6s",
          }}
        >
          <Link
            to="/collections/indian"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background"
          >
            View All Collections
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
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

export default FeaturedProducts;
