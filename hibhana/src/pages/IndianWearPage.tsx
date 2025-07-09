import ProductCard from "../components/ProductCard";
import WhatsAppButton from "../components/WhatsAppButton";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";

const IndianWearPage = () => {
  const { products, loading } = useProducts();

  const indianProducts = products.filter((product) => product.indianWear === true);

  return (
    <div className="min-h-screen w-full">
      {/* Header */}
      <div className="relative h-[40vh] bg-cover bg-center flex items-center justify-center"
           style={{ backgroundImage: `url(https://plus.unsplash.com/premium_photo-1673644093928-1511bf77edda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8)` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative z-10 text-4xl md:text-5xl text-white font-bold font-playfair">Indian Wear</h1>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-playfair mb-6">{indianProducts.length} Products</h2>

        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : indianProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {indianProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No Indian wear products found.</p>
            <Link to="/collections/indian" className="btn-primary mt-6">Browse Collections</Link>
          </div>
        )}
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default IndianWearPage;
