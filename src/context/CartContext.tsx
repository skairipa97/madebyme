
import React, { createContext, useContext, useState, useEffect } from "react";
import { CustomizedDesign } from "./DesignContext";
import { useAuth } from "./AuthContext";

export type CartItem = CustomizedDesign & {
  title: string;
  price: number;
  imageUrl: string;
  designerName: string;
  designerId: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  designerAmount: number;
  platformFee: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
  clientId: string;
  clientName: string;
  shippingAddress?: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  designerTotal: number;
  platformFee: number;
  orders: Order[];
  checkout: (shippingAddress: Order["shippingAddress"]) => Promise<string>;
};

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("couture_cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("couture_cart", JSON.stringify(cart));
  }, [cart]);

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Designers get 80% of the price
  const designerTotal = cartTotal * 0.8;
  
  // Platform fee is 20%
  const platformFee = cartTotal * 0.2;

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  // Remove an item from the cart
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Update item quantity
  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Process checkout
  const checkout = async (shippingAddress: Order["shippingAddress"]) => {
    if (!user) throw new Error("User must be logged in to checkout");
    if (cart.length === 0) throw new Error("Cart is empty");
    
    // In a real app, this would call a backend API to process payment
    // and create the order in the database
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newOrder: Order = {
      id: `order${Math.floor(Math.random() * 10000)}`,
      items: [...cart],
      totalAmount: cartTotal,
      designerAmount: designerTotal,
      platformFee: platformFee,
      status: "processing",
      createdAt: new Date().toISOString(),
      clientId: user.id,
      clientName: user.name,
      shippingAddress
    };
    
    setOrders([...orders, newOrder]);
    
    // Clear the cart after successful checkout
    clearCart();
    
    return newOrder.id;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        designerTotal,
        platformFee,
        orders,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
