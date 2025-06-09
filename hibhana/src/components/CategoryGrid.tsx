import { Link } from "react-router-dom";

interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "sherwanis",
    title: "Sherwanis",
    description: "Luxurious groom attire with intricate embroidery",
    image: "https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=800&auto=format&fit=crop",
    link: "/collections/sherwanis",
  },
  {
    id: "lehengas",
    title: "Lehengas",
    description: "Stunning bridal and celebration attire",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
    link: "/collections/lehengas",
  },
  {
    id: "kurtas",
    title: "Kurtas & Sets",
    description: "Elegant everyday and festive traditional wear",
    image: "https://images.unsplash.com/photo-1610713773560-89559bfc9770?q=80&w=800&auto=format&fit=crop",
    link: "/collections/kurtas",
  },
  {
    id: "indo-western",
    title: "Indo-Western",
    description: "Perfect fusion of traditional and contemporary styles",
    image: "https://images.unsplash.com/photo-1621452773781-0453844efd5a?q=80&w=800&auto=format&fit=crop",
    link: "/collections/indo-western",
  },
  {
    id: "western-formals",
    title: "Western Formals",
    description: "Sophisticated suits and blazers for every occasion",
    image: "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=800&auto=format&fit=crop",
    link: "/collections/western-formals",
  },
  {
    id: "bridal",
    title: "Bridal Collection",
    description: "Complete wedding ensembles for the perfect celebration",
    image: "https://images.unsplash.com/photo-1593658886759-7bb25d2e521e?q=80&w=800&auto=format&fit=crop",
    link: "/collections/bridal",
  },
];

const CategoryGrid = () => {
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
              to={category.link}
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
                <h3 className="text-2xl font-playfair text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
                  {category.title}
                </h3>
                <p className="text-white/90 mb-4 text-sm leading-relaxed transform transition-transform duration-500 group-hover:translate-y-0">
                  {category.description}
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-hibhana-gold to-hibhana-gold/50 mb-4 transform transition-transform duration-500 group-hover:translate-y-0"></div>
                <span className="inline-flex items-center text-sm font-medium text-white group-hover:text-hibhana-gold transition-colors duration-300">
                  Explore Collection
                  <svg 
                    className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
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
