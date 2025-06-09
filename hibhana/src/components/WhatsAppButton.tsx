
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling a bit
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href="https://wa.me/919876543210?text=Hello, I'm interested in Hibhana's collections. Can you provide more information?"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
        isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="white" className="stroke-[1.5]" />
    </a>
  );
};

export default WhatsAppButton;
