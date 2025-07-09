
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
                    src="https://lh3.googleusercontent.com/proxy/_ecxAqESy7Sqy22Yf17xG8VPPd4Xx2dp6OxZySRy-pjkomg12Sh17J7iSuTwiAta2_S8j0eVa5Y3wD-WksefDQ4JrX2jbpJLhDR5wT_3Q-rgCm878lm3elFoS0Q3Eny7EWba2mPHKJAMnFkWA2xwMoojDZ8OiVaUe-x6lQ=s1360-w1360-h1020-rw" 
                    alt="Hibhana Collection"     ///hibhana image
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1662833595899-07c57d617f56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvcm1hbCUyME1lbidzJTIwQ29sbGVjdGlvbiUyMG91dGZpdHxlbnwwfHwwfHx8MA%3D%3D" 
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
      
      <section className="py-16 md:py-24 bg-[url('https://lh3.googleusercontent.com/proxy/2rkEoCrGYSdB3Co23tFG_evg2OB6kf5kYdC74solWzShTNHqxZb6wAaLzlwvqjXHWGZae_UFGT3SO6D3RTjytI-dQesDjkRm9Wma86qc-eoHl0tF66LrihJ6jiWJLw95LjZLS38yIHqtZo4hs2EfVPllwhdyEByeXU2BeA=s1360-w1360-h1020-rw')] bg-cover bg-center parallax-bg">
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
