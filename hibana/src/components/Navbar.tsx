import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Instagram, MessageCircle, Sun, Moon } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // ... existing useEffect and other code ...

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-hibhana-gold">
            HIBANA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
            >
              Products
            </Link>
            <Link
              to="/collections"
              className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
            >
              About
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:text-hibhana-gold transition-colors duration-300"
            >
              <Search size={20} />
            </button>
            <a
              href="https://instagram.com/hibana"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-hibhana-gold transition-colors duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-hibhana-gold transition-colors duration-300"
            >
              <MessageCircle size={20} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:text-hibhana-gold transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/collections"
                className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Collections
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium hover:text-hibhana-gold transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              {/* Mobile Search Bar */}
              <div className="mt-4">
                <SearchBar isMobile />
              </div>
              {/* Mobile Action Buttons */}
              <div className="flex items-center space-x-4 mt-4">
                <a
                  href="https://instagram.com/hibana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-hibhana-gold transition-colors duration-300"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-hibhana-gold transition-colors duration-300"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar; 