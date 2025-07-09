import { useCategories } from "../context/CategoryContext";
import { Link } from "react-router-dom";

const CategoryGrid = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return <div className="text-center py-12">Loading categories...</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair tracking-tight">
            Our Collections
          </h2>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-hibhana-gold/50 via-hibhana-gold to-hibhana-gold/50 rounded-full"></div>
          <p className="mt-8 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Explore our curated collections of premium Indian and Western wear,
            crafted with passion and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/collections/${category.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] relative">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform transition-transform duration-500 group-hover:translate-y-0">
                <h3 className="text-2xl font-playfair text-white mb-2">
                  {category.title}
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-hibhana-gold to-hibhana-gold/50 mb-4"></div>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-hibhana-gold transition-colors duration-300">
                  Explore Collection
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
// This component displays a grid of categories with images and titles.
// It uses the `useCategories` hook to fetch categories from the context.