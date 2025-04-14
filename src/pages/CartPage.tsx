
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import { CartItem } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronRight, AlertCircle } from "lucide-react";

export default function CartPage() {
  const { cart, cartTotal, designerTotal, platformFee } = useCart();
  
  const isEmpty = cart.length === 0;
  
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>
        <p className="text-muted-foreground mb-6">
          Review your items before proceeding to checkout
        </p>
        
        {isEmpty ? (
          <div className="text-center py-16 border rounded-lg">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-30" />
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet.
              Start shopping to find unique designs!
            </p>
            <Link to="/designs">
              <Button className="gradient-purple">
                Browse Designs
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white border rounded-lg">
                {cart.map((item, index) => (
                  <CartItem key={`${item.designId}-${index}`} item={item} index={index} />
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="sticky top-24 bg-white border rounded-lg p-6 space-y-4">
                <h2 className="font-medium text-xl">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Designer earnings:</span>
                      <span>${designerTotal.toFixed(2)} (80%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform fee:</span>
                      <span>${platformFee.toFixed(2)} (20%)</span>
                    </div>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full gradient-purple">
                    Proceed to Checkout
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                
                <div className="text-xs text-muted-foreground flex items-start gap-2 mt-2">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <p>
                    By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
