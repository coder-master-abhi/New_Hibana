import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Slide {
  id: string; // Unique identifier for the slide
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const HeroSlider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const snapshot = await getDocs(collection(db, "heroSlides"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Slide[];
        setSlides(data);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    };

    fetchSlides();
  }, []);

  const nextSlide = () => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    if (isHovered || slides.length === 0) return;
    const interval = setInterval(() => nextSlide(), 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, slides.length]);

  return (
    <div 
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform duration-1000"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="space-y-6">
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-playfair tracking-tight"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: 'fadeInUp 0.8s ease forwards',
                    animationDelay: '0.2s'
                  }}
                >
                  {slide.title}
                </h2>
                <p 
                  className="text-xl md:text-2xl text-white/90 mb-8 font-light"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: 'fadeInUp 0.8s ease forwards',
                    animationDelay: '0.4s'
                  }}
                >
                  {slide.subtitle}
                </p>
                <div 
                  className="space-y-4"
                  style={{
                    opacity: 0,
                    transform: 'translateY(20px)',
                    animation: 'fadeInUp 0.8s ease forwards',
                    animationDelay: '0.6s'
                  }}
                >
                  <p className="text-hibhana-gold text-lg font-light italic mb-6">
                    Luxury Indian & Western Wear – Designed in Bandra, Mumbai
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-flex items-center justify-center px-8 py-3 text-base font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background group"
                  >
                    Explore Collection
                    <svg 
                      className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute inset-x-0 bottom-10 flex justify-center items-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return;
              setIsTransitioning(true);
              setCurrentSlide(index);
              setTimeout(() => setIsTransitioning(false), 1000);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-12 bg-gradient-to-r from-hibhana-gold/80 to-hibhana-gold"
                : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="transform transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-3 z-10 transition-all duration-300 hover:scale-110 backdrop-blur-sm group"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="transform transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* Brand Tagline */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex justify-center">
          <h1 
            className="text-hibhana-ivory text-3xl md:text-4xl font-bold bg-black/40 backdrop-blur-md px-12 py-6 rounded-t-2xl border-t border-white/10"
            style={{
              opacity: 0,
              transform: 'translateY(20px)',
              animation: 'fadeInUp 0.8s ease forwards',
              animationDelay: '0.8s'
            }}
          >
            Where Tradition Meets Couture
          </h1>
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

export default HeroSlider;
