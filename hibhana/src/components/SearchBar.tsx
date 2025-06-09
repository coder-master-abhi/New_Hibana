import { useState, useRef, useEffect } from "react";
import { Search, X, Clock, TrendingUp, Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface SearchResult {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
}

interface SearchBarProps {
  onClose?: () => void;
  isMobile?: boolean;
}

const SearchBar = ({ onClose, isMobile = false }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trendingSearches] = useState<string[]>([
    "Bridal Lehenga",
    "Designer Saree",
    "Party Wear",
    "Wedding Collection"
  ]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search results - replace with actual API call
  const searchResults: SearchResult[] = [
    {
      id: "1",
      name: "Floral Print Lehenga",
      category: "Bridal",
      image: "/images/products/lehenga-1.jpg",
      price: 25000
    },
    {
      id: "2",
      name: "Embroidered Saree",
      category: "Indian",
      image: "/images/products/saree-1.jpg",
      price: 15000
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setShowResults(true);
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => [searchQuery, ...prev].slice(0, 5));
    }
  };

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div 
      ref={searchRef}
      className={`relative ${isMobile ? 'w-full' : 'w-[400px]'}`}
    >
      <div className="relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowResults(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Search for products..."
            className={`w-full bg-background/50 backdrop-blur-sm border border-border rounded-full py-2.5 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-hibhana-gold/50 focus:border-hibhana-gold transition-all duration-300 ${
              isFocused ? 'shadow-lg shadow-hibhana-gold/10' : ''
            }`}
          />
          <Search 
            size={18} 
            className="absolute left-4 text-muted-foreground"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 p-1 rounded-full hover:bg-muted transition-colors duration-300"
            >
              <X size={16} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl overflow-hidden z-50">
          {query ? (
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Search Results</h3>
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={`/product/${result.id}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{result.name}</p>
                      <p className="text-xs text-muted-foreground">{result.category}</p>
                    </div>
                    <p className="text-sm font-medium text-hibhana-gold">
                      ₹{result.price.toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    Recent Searches
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300 text-left"
                      >
                        <Clock size={16} className="text-muted-foreground" />
                        <span className="text-sm">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-muted-foreground" />
                  Trending Searches
                </h3>
                <div className="space-y-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors duration-300 text-left"
                    >
                      <Tag size={16} className="text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 