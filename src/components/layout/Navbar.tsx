
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  LogOut, 
  PenTool, 
  Home, 
  Search, 
  Info, 
  Mail 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <PenTool className="h-6 w-6 text-purple-500" />
          <span className="font-bold text-xl">CustomCouture</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          <Link to="/" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Home
          </Link>
          <Link to="/designs" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Browse Designs
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-purple-500 transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-purple-500 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-purple-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Search button */}
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </Link>

          {/* User dropdown or auth buttons */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="w-full cursor-pointer">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user?.role === "designer" && (
                  <DropdownMenuItem asChild>
                    <Link to="/upload" className="w-full cursor-pointer">
                      Upload Design
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full cursor-pointer">
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="w-full cursor-pointer">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="gradient-purple">
                  Sign up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 bg-background border-t">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-purple-500"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link 
              to="/designs" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-purple-500"
            >
              <Search className="h-4 w-4 mr-2" />
              Browse Designs
            </Link>
            <Link 
              to="/how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-purple-500"
            >
              <Info className="h-4 w-4 mr-2" />
              How It Works
            </Link>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-purple-500"
            >
              <Info className="h-4 w-4 mr-2" />
              About Us
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center py-2 hover:text-purple-500"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center py-2 hover:text-purple-500"
                >
                  <User className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                {user?.role === "designer" && (
                  <Link 
                    to="/upload" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center py-2 hover:text-purple-500"
                  >
                    <PenTool className="h-4 w-4 mr-2" />
                    Upload Design
                  </Link>
                )}
                <button 
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center py-2 text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link 
                  to="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button className="gradient-purple w-full">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
