import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, ShoppingBag, Phone } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Indian Wear", href: "/indian-wear" }, 
  { name: "Western Wear", href: "/western-wear" }, // ✅ updated path
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
// Note: Ensure the paths match your routing setup

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-300 ${
                location.pathname === item.href 
                  ? "text-hibhana-gold" 
                  : "text-foreground hover:text-hibhana-gold"
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-hibhana-gold after:transition-all after:duration-300 hover:after:w-full ${
                location.pathname === item.href ? "after:w-full" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <ThemeToggle />
          <a
            href="https://www.instagram.com/hibana_/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
            aria-label="WhatsApp"
          >
            <Phone size={20} />
          </a>
          <Link 
            to="/appointment" 
            className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background"
          >
            Book Appointment
          </Link>
          <Link
            to="/admin/login"
            className="ml-2 px-4 py-2 rounded text-sm font-semibold border border-hibhana-maroon text-hibhana-maroon bg-white hover:bg-hibhana-maroon hover:text-white transition-colors duration-300"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden space-x-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu} 
            aria-label="Toggle menu"
            className="p-2 rounded-full hover:bg-foreground/5 transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X size={24} className="text-foreground" />
            ) : (
              <Menu size={24} className="text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/50">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block py-2.5 text-lg font-medium ${
                  location.pathname === item.href 
                    ? "text-hibhana-gold" 
                    : "text-foreground hover:text-hibhana-gold"
                } transition-colors duration-300`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block py-2.5 text-lg font-semibold text-hibhana-maroon border border-hibhana-maroon rounded hover:bg-hibhana-maroon hover:text-white transition-colors duration-300"
            >
              Admin Login
            </Link>
            <hr className="border-border/50 my-4" />
            <div className="flex items-center space-x-6 pt-2">
              <a
                href="https://www.instagram.com/hibana_/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
              <Link 
                to="/appointment" 
                className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide text-white transition-all duration-300 bg-gradient-to-r from-hibhana-gold/90 to-hibhana-gold rounded-full hover:shadow-lg hover:shadow-hibhana-gold/20 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-hibhana-gold focus:ring-offset-2 focus:ring-offset-background"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
