
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, CreditCard, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CheckoutForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, cartTotal, designerTotal, platformFee, checkout } = useCart();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA"
  });
  
  // For demo purposes, we're not collecting real payment info
  // In a real app, you would integrate with a payment processor like Stripe
  
  const handleAddressChange = (field: string, value: string) => {
    setShippingAddress({
      ...shippingAddress,
      [field]: value
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    
    if (cart.length === 0) {
      navigate("/cart");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const orderId = await checkout(shippingAddress);
      
      // Redirect to success page
      navigate(`/order-success/${orderId}`);
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  // List of countries (abbreviated)
  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "France",
    "Japan"
  ];
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Shipping Information */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={shippingAddress.fullName}
              onChange={(e) => handleAddressChange("fullName", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={shippingAddress.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={shippingAddress.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                value={shippingAddress.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip/Postal Code</Label>
              <Input
                id="zipCode"
                value={shippingAddress.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={shippingAddress.country}
                onValueChange={(value) => handleAddressChange("country", value)}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Payment Information</h2>
          <div className="p-4 bg-neutral-50 rounded-lg border">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-purple-500">
                <CreditCard className="h-5 w-5 mr-2" />
                <span className="font-medium">Demo Payment</span>
              </div>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <Lock className="h-3.5 w-3.5 mr-1" />
                Secure
              </span>
            </div>
            <p className="text-sm mt-2 text-muted-foreground">
              For demo purposes, no real payment will be processed. 
              Click "Complete Order" to simulate a payment.
            </p>
          </div>
          
          <Button
            type="submit"
            className="gradient-purple w-full mt-6"
            size="lg"
            disabled={isProcessing || cart.length === 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Complete Order"
            )}
          </Button>
        </form>
      </div>
      
      {/* Order Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="bg-neutral-50 rounded-lg border p-4">
          <div className="max-h-80 overflow-y-auto space-y-3">
            {cart.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="aspect-square h-16 w-16 overflow-hidden rounded bg-white flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.title}</h4>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.selectedColor.name}, {item.selectedSize}, Qty: {item.quantity}
                  </p>
                  {item.customText && (
                    <p className="text-sm text-muted-foreground">
                      Text: "{item.customText}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>Calculated at next step</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          
          <div className="mt-4 pt-4 border-t border-dashed text-sm text-muted-foreground">
            <p>Designer earnings: ${designerTotal.toFixed(2)} (80%)</p>
            <p>Platform fee: ${platformFee.toFixed(2)} (20%)</p>
          </div>
        </div>
        
        <div className="mt-6 bg-purple-50 rounded-lg border border-purple-100 p-4">
          <h3 className="font-medium text-purple-700">Satisfaction Guarantee</h3>
          <p className="text-sm text-purple-700 mt-1">
            Not happy with your order? We offer a 30-day satisfaction guarantee.
            Return any item in its original condition for a full refund.
          </p>
        </div>
      </div>
    </div>
  );
}
