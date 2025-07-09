import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const WesternWearPage = () => {
  const { products, loading } = useProducts();

  const westernProducts = products.filter((product) => product.westernWear === true);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: `url(https://media.istockphoto.com/id/1248892955/photo/group-of-vintage-gangster-men-in-an-old-city.webp?a=1&s=612x612&w=0&k=20&c=jUZGO-XSB069ITwFzWneLggI3ZOiKeosSRW-_xsFsC4=)` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl text-white font-bold font-playfair">Western Wear</h1>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-playfair mb-6">{westernProducts.length} Products</h2>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : westernProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {westernProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No Western wear products found.</p>
            <Link to="/collections/western" className="btn-primary mt-6">Browse Collections</Link>
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default WesternWearPage;
