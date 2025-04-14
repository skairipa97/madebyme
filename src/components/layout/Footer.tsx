
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PenTool, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-100 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and socials */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <PenTool className="h-6 w-6 text-purple-500" />
              <span className="font-bold text-xl">CustomCouture</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              A platform connecting creative clothing designers with customers who want personalized fashion.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-purple-500 hover:bg-purple-100">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-purple-500 hover:bg-purple-100">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-purple-500 hover:bg-purple-100">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-purple-500 hover:bg-purple-100">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium">Platform</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/how-it-works" className="text-muted-foreground hover:text-purple-500 transition-colors">
                How It Works
              </Link>
              <Link to="/pricing" className="text-muted-foreground hover:text-purple-500 transition-colors">
                Pricing
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-purple-500 transition-colors">
                FAQ
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-purple-500 transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium">For Designers</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/signup?role=designer" className="text-muted-foreground hover:text-purple-500 transition-colors">
                Join as Designer
              </Link>
              <Link to="/seller-guidelines" className="text-muted-foreground hover:text-purple-500 transition-colors">
                Seller Guidelines
              </Link>
              <Link to="/designer-resources" className="text-muted-foreground hover:text-purple-500 transition-colors">
                Resources
              </Link>
              <Link to="/success-stories" className="text-muted-foreground hover:text-purple-500 transition-colors">
                Success Stories
              </Link>
            </nav>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-medium">Subscribe to our newsletter</h4>
            <p className="text-muted-foreground">
              Get the latest updates on new designs and features.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="max-w-sm"
              />
              <Button className="gradient-purple">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CustomCouture. All rights reserved.</p>
          <div className="flex mt-4 md:mt-0 gap-4">
            <Link to="/privacy" className="hover:text-purple-500 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-purple-500 transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-purple-500 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
