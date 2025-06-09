
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  textSize?: string;
}

const Logo = ({ className = "", textSize = "text-2xl" }: LogoProps) => {
  return (
    <Link to="/" className={`font-playfair font-bold ${textSize} tracking-wider ${className}`}>
      <span className="text-foreground">H I B H </span>
      <span className="text-hibhana-maroon">A</span>
      <span className="text-foreground"> N A</span>
    </Link>
  );
};

export default Logo;
