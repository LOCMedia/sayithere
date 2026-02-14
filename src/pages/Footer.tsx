import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border/40 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link 
              to="/about" 
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link 
              to="/faq" 
              className="hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link 
              to="/privacy" 
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </nav>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} SayItHere. A safe space to be heard.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
