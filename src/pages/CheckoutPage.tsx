
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Layout } from "@/components/layout/Layout";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/checkout" } });
    } else if (cart.length === 0) {
      navigate("/cart");
    }
  }, [isAuthenticated, cart, navigate]);
  
  if (!isAuthenticated || cart.length === 0) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-semibold mb-2">Checkout</h1>
        <p className="text-muted-foreground mb-8">
          Complete your purchase by providing shipping and payment information
        </p>
        
        <CheckoutForm />
      </div>
    </Layout>
  );
}
