
import HeroSlider from "../components/HeroSlider";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import InstagramFeed from "../components/InstagramFeed";
import WhatsAppButton from "../components/WhatsAppButton";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen w-full">
      <HeroSlider />
      
      <section className="py-16 md:py-24 bg-hibhana-black text-hibhana-ivory">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Where Tradition Meets Couture</h2>
              <div className="h-1 w-24 bg-hibhana-gold mb-6"></div>
              <p className="text-lg mb-6 text-hibhana-ivory/80">
                At Hibhana, we blend traditional craftsmanship with contemporary designs to create clothing that celebrates heritage while embracing modern aesthetics.
              </p>
              <p className="mb-8 text-hibhana-ivory/80">
                Each piece in our collection is meticulously crafted with attention to detail, premium fabrics, and exquisite embellishments, reflecting our commitment to quality and authenticity.
              </p>
              <Link to="/about" className="btn-outline">
                Discover Our Story
              </Link>
            </div>
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=800&auto=format&fit=crop" 
                    alt="Hibhana Collection" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop" 
                    alt="Hibhana Collection" 
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CategoryGrid />
      <FeaturedProducts />
      
      <section className="py-16 md:py-24 bg-[url('https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1800&auto=format&fit=crop')] bg-cover bg-center parallax-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto bg-background/90 backdrop-blur-md p-8 md:p-12 rounded-lg text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">Custom Design Services</h2>
            <div className="h-0.5 w-24 bg-hibhana-gold mx-auto mb-6"></div>
            <p className="text-lg mb-6">
              Looking for something uniquely yours? Our expert designers can help create custom attire for your special occasions.
            </p>
            <Link to="/appointment" className="btn-primary">
              Book a Design Consultation
            </Link>
          </div>
        </div>
      </section>
      
      <InstagramFeed />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
