
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  images: string[];
  category: string;
  featured: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  sizes?: string[];
  colors?: string[];
  fabric?: string;
}

export const products: Product[] = [
  // Sherwanis
  {
    id: "sherwani-1",
    name: "Royal Maroon Wedding Sherwani",
    price: 45000,
    description: "Luxurious maroon sherwani with intricate gold embroidery, perfect for wedding ceremonies.",
    details: [
      "Handcrafted gold embroidery",
      "Premium silk fabric",
      "Comes with matching accessories",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "sherwanis",
    featured: true,
    isBestSeller: true,
    rating: 5,
    sizes: ["38", "40", "42", "44"],
    fabric: "Premium Silk"
  },
  {
    id: "sherwani-2",
    name: "Ivory Gold Embroidered Sherwani",
    price: 52000,
    description: "Elegant ivory sherwani with intricate golden embroidery and subtle patterns.",
    details: [
      "Intricate zari embroidery",
      "Premium silk blend",
      "Comes with matching stole",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1626240130051-68871c71de90?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626240130051-68871c71de90?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "sherwanis",
    featured: true,
    isNew: true,
    rating: 4.5,
    sizes: ["38", "40", "42", "44", "46"],
    fabric: "Silk Blend"
  },
  
  // Lehengas
  {
    id: "lehenga-1",
    name: "Bridal Red Embroidered Lehenga",
    price: 75000,
    description: "Stunning red bridal lehenga with traditional zari work and modern silhouette.",
    details: [
      "Intricate handwork embroidery",
      "Premium raw silk fabric",
      "Comes with matching dupatta",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "lehengas",
    featured: true,
    isBestSeller: true,
    rating: 5,
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Raw Silk"
  },
  {
    id: "lehenga-2",
    name: "Pastel Pink Embellished Lehenga",
    price: 68000,
    description: "Delicate pastel pink lehenga with pearl and crystal embellishments, perfect for modern brides.",
    details: [
      "Hand-sewn pearl embellishments",
      "Premium organza fabric",
      "Includes designer blouse and dupatta",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1594387310549-90a3b0b7a687?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594387310549-90a3b0b7a687?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "lehengas",
    featured: true,
    isNew: true,
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Organza Silk"
  },
  
  // Indo-Western
  {
    id: "indo-western-1",
    name: "Navy Blue Indo-Western Set",
    price: 32000,
    description: "Modern Indo-Western navy blue ensemble with contemporary silhouette.",
    details: [
      "Contemporary design",
      "Premium imported fabric",
      "Perfect for cocktail parties",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1621452773781-0453844efd5a?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621452773781-0453844efd5a?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "indo-western",
    featured: true,
    rating: 4.6,
    sizes: ["38", "40", "42", "44"],
    fabric: "Italian Wool Blend"
  },
  {
    id: "indo-western-2",
    name: "Teal Textured Indo-Western Jacket",
    price: 36000,
    description: "Contemporary teal jacket with textured fabric and minimal embroidery details.",
    details: [
      "Subtle embroidery details",
      "Premium textured fabric",
      "Perfect for reception events",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1592237811812-d49aef7238b2?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592237811812-d49aef7238b2?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "indo-western",
    featured: false,
    isNew: true,
    rating: 4.7,
    sizes: ["38", "40", "42", "44", "46"],
    fabric: "Textured Silk Blend"
  },
  
  // Kurtas
  {
    id: "kurta-1",
    name: "Beige Embroidered Kurta Set",
    price: 28000,
    description: "Elegant beige kurta set with subtle embroidery, perfect for festive occasions.",
    details: [
      "Intricate thread work",
      "Premium cotton silk fabric",
      "Comes with matching bottom",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1610713773560-89559bfc9770?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610713773560-89559bfc9770?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "kurtas",
    featured: true,
    rating: 4.5,
    sizes: ["38", "40", "42", "44"],
    fabric: "Cotton Silk"
  },
  {
    id: "kurta-2",
    name: "Sage Green Linen Kurta Set",
    price: 24000,
    description: "Lightweight sage green linen kurta with minimal embroidery for a sophisticated look.",
    details: [
      "Subtle embroidery details",
      "Premium linen fabric",
      "Includes matching pants",
      "Perfect for summer events"
    ],
    images: [
      "https://images.unsplash.com/photo-1610713771141-fe6d979cf876?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1610713771141-fe6d979cf876?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "kurtas",
    featured: false,
    isBestSeller: true,
    rating: 4.8,
    sizes: ["38", "40", "42", "44", "46"],
    fabric: "Premium Linen"
  },
  
  // Western Formals
  {
    id: "western-1",
    name: "Charcoal Grey Tailored Suit",
    price: 42000,
    description: "Sophisticated charcoal grey tailored suit crafted from premium Italian fabric.",
    details: [
      "Modern slim fit",
      "Italian wool blend",
      "Hand-finished details",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622519407650-3df9883f76a5?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "western-formals",
    featured: true,
    rating: 4.7,
    sizes: ["38", "40", "42", "44"],
    fabric: "Italian Wool"
  },
  {
    id: "western-2",
    name: "Navy Blue Structured Blazer",
    price: 32000,
    description: "Classic navy blue blazer with structured shoulders and minimal detailing.",
    details: [
      "Structured silhouette",
      "Premium wool blend",
      "Versatile styling options",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1611652064348-15d8191f74bc?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611652064348-15d8191f74bc?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "western-formals",
    featured: false,
    isNew: true,
    rating: 4.6,
    sizes: ["38", "40", "42", "44", "46"],
    fabric: "Wool Blend"
  },
  
  // Partywear
  {
    id: "party-1",
    name: "Black Sequin Evening Gown",
    price: 36000,
    description: "Glamorous black sequin evening gown with a sleek silhouette.",
    details: [
      "Hand-applied sequins",
      "Premium georgette fabric",
      "Elegant floor-length design",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "partywear",
    featured: true,
    rating: 4.9,
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Georgette"
  },
  {
    id: "party-2",
    name: "Ruby Red Velvet Cocktail Dress",
    price: 29000,
    description: "Luxurious ruby red velvet cocktail dress with subtle embellishments.",
    details: [
      "Premium velvet fabric",
      "Crystal embellishments",
      "Figure-flattering silhouette",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1571195508329-b4cfea31ae36?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571195508329-b4cfea31ae36?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "partywear",
    featured: false,
    isBestSeller: true,
    rating: 4.8,
    sizes: ["XS", "S", "M", "L", "XL"],
    fabric: "Velvet"
  },
  
  // Accessories
  {
    id: "accessory-1",
    name: "Royal Maroon Silk Pagdi",
    price: 8500,
    description: "Traditional maroon silk pagdi with golden accents, perfect for wedding ceremonies.",
    details: [
      "Premium silk fabric",
      "Gold zari details",
      "Adjustable size",
      "Handcrafted by skilled artisans"
    ],
    images: [
      "https://images.unsplash.com/photo-1589189923666-ef3cfef357c5?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589189923666-ef3cfef357c5?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "accessories",
    featured: false,
    isNew: true,
    rating: 4.7,
    sizes: ["One Size"],
    fabric: "Silk"
  },
  {
    id: "accessory-2",
    name: "Zari Work Dupatta",
    price: 12000,
    description: "Elegant dupatta with intricate zari work borders, perfect to complement your outfit.",
    details: [
      "Premium silk fabric",
      "Handcrafted zari borders",
      "Versatile styling options",
      "Perfect for special occasions"
    ],
    images: [
      "https://images.unsplash.com/photo-1611652064348-15d8191f74bc?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611652064348-15d8191f74bc?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "accessories",
    featured: false,
    isBestSeller: true,
    rating: 4.8,
    sizes: ["One Size"],
    fabric: "Silk"
  },
  
  // Bridal Collection
  {
    id: "bridal-1",
    name: "Royal Wedding Ensemble",
    price: 120000,
    description: "Complete royal wedding ensemble for the bride and groom, featuring matching designs.",
    details: [
      "Bridal lehenga with heavy embroidery",
      "Matching groom's sherwani",
      "Complementary accessories included",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631134708577-dc9e4e1d3450?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "bridal",
    featured: true,
    isNew: true,
    rating: 5,
    sizes: ["Custom"],
    fabric: "Premium Silk and Velvet"
  },
  {
    id: "bridal-2",
    name: "Pastel Engagement Collection",
    price: 85000,
    description: "Elegant pastel-colored couple set perfect for engagement ceremonies.",
    details: [
      "Bride's pastel lehenga with subtle embroidery",
      "Matching groom's indo-western outfit",
      "Complete with accessories",
      "Custom fitting available"
    ],
    images: [
      "https://images.unsplash.com/photo-1594387310549-90a3b0b7a687?q=80&w=1800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592237811812-d49aef7238b2?q=80&w=1800&auto=format&fit=crop"
    ],
    category: "bridal",
    featured: true,
    isBestSeller: true,
    rating: 4.9,
    sizes: ["Custom"],
    fabric: "Organza and Silk Blend"
  },
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (id: string, category: string) => {
  return products
    .filter(product => product.category === category && product.id !== id)
    .slice(0, 4);
};
