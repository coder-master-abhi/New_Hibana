import { useState } from "react";
import { Heart, ZoomIn, ZoomOut } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  return (
    <div className="space-y-6">
      <div 
        className="relative h-[600px] overflow-hidden rounded-xl group cursor-zoom-in bg-gradient-to-b from-background/5 to-background/10"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={selectedImage}
          alt={productName}
          className="w-full h-full object-cover object-center transition-all duration-500"
          style={
            isZoomed
              ? {
                  transform: 'scale(2)',
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  filter: 'brightness(1.05)'
                }
              : {}
          }
        />
        
        {/* Zoom Indicator */}
        <div className={`absolute bottom-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${
          isZoomed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-300 ${
            isWishlisted 
              ? 'bg-hibhana-maroon text-white' 
              : 'bg-white/90 backdrop-blur-sm hover:bg-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={20} 
            className={isWishlisted ? "fill-current" : ""}
          />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 h-28 w-28 rounded-lg overflow-hidden transition-all duration-300 ${
              selectedImage === img 
                ? "ring-2 ring-hibhana-gold shadow-lg shadow-hibhana-gold/20" 
                : "hover:ring-1 hover:ring-hibhana-gold/50"
            }`}
          >
            <img
              src={img}
              alt={`${productName} - View ${index + 1}`}
              className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-110"
            />
          </button>
        ))}
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default ProductGallery;
