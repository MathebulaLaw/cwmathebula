import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-gold py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary-foreground mb-4 md:mb-0">
            © 2025 CW Mathebula and Associates Inc. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-gold font-semibold uppercase tracking-wider text-sm">
              Truth • Justice • Honour
            </div>
            <Link
              to="/blog/admin"
              className="text-navy-light hover:text-gold transition-smooth text-xs opacity-50 hover:opacity-100"
              aria-label="Admin Login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;