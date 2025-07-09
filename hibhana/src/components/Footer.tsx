import { Instagram, Phone, Mail, MapPin, Facebook, Twitter } from "lucide-react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-hibhana-black to-black text-hibhana-ivory pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo className="text-hibhana-ivory" />
            <p className="text-sm text-gray-300/90 leading-relaxed">
              Where tradition meets couture. Premium Indian and Western wear for
              all your special occasions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.instagram.com/hibhana_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
              <a
                href="mailto:contact@hibhana.com"
                className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl mb-6 text-hibhana-ivory relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-hibhana-gold/50 to-hibhana-gold"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Indian Wear", path: "/collections/indian" },
                { name: "Western Wear", path: "/collections/western" },
                
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-hibhana-gold transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-playfair text-xl mb-6 text-hibhana-ivory relative inline-block">
              Collections
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-hibhana-gold/50 to-hibhana-gold"></div>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Sherwanis", path: "/collections/sherwanis" },
                { name: "Kurtas & Sets", path: "/collections/kurtas" },
                
                { name: "Indo-Western", path: "/collections/indo-western" },
                { name: "Western Formals", path: "/collections/western-formals" },
                { name: "Accessories", path: "/collections/accessories" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-hibhana-gold transition-all duration-300 text-sm inline-flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-hibhana-gold transition-all duration-300 group-hover:w-3 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair text-xl mb-6 text-hibhana-ivory relative inline-block">
              Visit Us
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-hibhana-gold/50 to-hibhana-gold"></div>
            </h3>
            <address className="not-italic text-gray-300/90 text-sm space-y-4">
              <p className="flex items-start group">
                <MapPin size={18} className="mr-3 mt-1 text-hibhana-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="leading-relaxed">
                  Hibhana Couture,<br />
                  Shop No 7, Opposite Elco Arcade, Near Parison Mens Wear,<br />
                  Off Hill Road, Boran Road, Bandra West-400050
                </span>
              </p>
              <p className="flex items-center group">
                <Phone size={18} className="mr-3 text-hibhana-gold group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-hibhana-gold transition-all duration-300"
                >
                  +91  98192 20622
                </a>
              </p>
              <p className="flex items-center group">
                <Mail size={18} className="mr-3 text-hibhana-gold group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:contact@hibhana.com"
                  className="hover:text-hibhana-gold transition-all duration-300"
                >
                  contact@hibhana.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400/80">
              &copy; {new Date().getFullYear()} Hibhana. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-400/80 hover:text-hibhana-gold transition-all duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400/80 hover:text-hibhana-gold transition-all duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/shipping"
                className="text-sm text-gray-400/80 hover:text-hibhana-gold transition-all duration-300"
              >
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
