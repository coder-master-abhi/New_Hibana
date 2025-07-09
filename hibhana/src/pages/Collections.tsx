import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

import { useProducts } from "../context/ProductContext";
import { useCategories } from "../context/CategoryContext"; // Assumes you have this

const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const [showFilters, setShowFilters] = useState(false);

  const { products: allProducts, loading } = useProducts();
  const { categories } = useCategories(); // dynamically fetched from Firestore

  // Dynamically get display title for category
  const categoryTitle =
    categories.find(
      (c) => c.slug?.toLowerCase() === category?.toLowerCase()
    )?.title || "Products";

  // Filter products by category
  const normalize = (str?: string) =>
  str?.toLowerCase().trim().replace(/\s+/g, '-');

const filteredProducts = allProducts.filter(
  (product) =>
    normalize(product.category) === normalize(category)
);

  // Optional: Get banner image based on category
  const getBannerImage = () => {
    switch (category) {
      case "sherwanis":
        return "https://images.unsplash.com/photo-1610047402714-307d99a677db?w=600&auto=format&fit=crop&q=60";
      case "kurtas":
        return "https://plus.unsplash.com/premium_photo-1691030256404-05490d501654?w=600&auto=format&fit=crop";
      case "indo-western":
        return "https://images.unsplash.com/photo-1629186341951-c6e74410bcbc?w=600&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=1800&auto=format&fit=crop";
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Banner */}
      <div
        className="relative h-[40vh] bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${getBannerImage()})` }}
      >
        <div className="absolute inset-0 bg-hibhana-black/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-hibhana-ivory mb-4 font-playfair">
            {categoryTitle}
          </h1>
          <div className="h-1 w-24 mx-auto bg-hibhana-gold"></div>
          <p className="text-hibhana-ivory/90 mt-4 max-w-xl mx-auto px-4">
            Discover our exquisite collection of {categoryTitle.toLowerCase()}, crafted with passion and precision.
          </p>
        </div>
      </div>

      {/* Product Section */}
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-playfair">{filteredProducts.length} Products</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted/50 transition-colors"
          >
            <Filter size={18} />
            Filters
            <ChevronDown
              size={18}
              className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {showFilters && (
          <div className="bg-muted/20 p-4 rounded-md mb-8 animate-fade-in">
            {/* Filters UI - You can extend functionality later */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <select className="w-full border rounded-md p-2">
                  <option>All Sizes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <select className="w-full border rounded-md p-2">
                  <option>All Colors</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Price</label>
                <select className="w-full border rounded-md p-2">
                  <option>All Prices</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select className="w-full border rounded-md p-2">
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-[350px] w-full rounded mb-4"></div>
                <div className="bg-muted h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-muted h-4 w-1/4 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found in this category.</p>
            <Link to="/collections/indian" className="btn-primary mt-6">
              View All Collections
            </Link>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 font-playfair">
            Looking for something specific?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us for personalized assistance or to schedule an appointment for a custom fitting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/appointment" className="btn-primary">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Collections;
