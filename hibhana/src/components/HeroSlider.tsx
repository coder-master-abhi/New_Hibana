import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Royal Wedding Collection",
    subtitle: "Elegance for the Modern Groom",
    image: "https://images.unsplash.com/photo-1695857596080-a15b7d35c35b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/collections/sherwanis",
  },
  {
    id: 2,
    title: "Menswear Essentials",
    subtitle: "Refined Looks for Every Occasion",
    image: "https://images.unsplash.com/photo-1566070143658-523a24797109?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "/collections/lehengas",
  },
  {
    id: 3,
    title: "Designer Indo-Western",
    subtitle: "Fusion Fashion for Modern Celebrations",
    image: "https://images.unsplash.com/photo-1610271283578-a595c4608e13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8RGVzaWduZXIlMjBJbmRvJTIwV2VzdGVybiUyMG91dGZpdCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "/collections/indo-western",
  },
  {
    id: 4,
    title: "Luxury Formal Wear",
    subtitle: "Sophistication in Every Stitch",
    image: "https://images.unsplash.com/photo-1679101893374-0785edca70e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8THV4dXJ5JTIwRm9ybWFsJTIwV2VhciUyMG91dGZpdCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "/collections/western-formals",
  },
  {
    id: 5,
    title: "Signature Men's Collection",
    subtitle: "Unforgettable Memories, Timeless Attire",
    image: "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8U2lnbmF0dXJlJTIwTWVuJ3MlMjBDb2xsZWN0aW9uciUyMG91dGZpdCUyMG1lbnxlbnwwfHwwfHx8MA%3D%3D",
    link: "/collections/bridal",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered]);

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
          style={{
            zIndex: index === currentSlide ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-center bg-cover transform transition-transform duration-1000"
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
