
import { useState } from "react";
import { useCart, CartItem as CartItemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CartItemProps = {
  item: CartItemType;
  index: number;
};

export function CartItem({ item, index }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(index, newQuantity);
  };
  
  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {/* Product image */}
      <div className="aspect-square h-20 w-20 min-w-20 overflow-hidden rounded-md bg-white">
        <img 
          src={item.imageUrl} 
          alt={item.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product details */}
      <div className="flex-1">
        <h3 className="font-medium">{item.title}</h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
          <span>Color: {item.selectedColor.name}</span>
          <span>Size: {item.selectedSize}</span>
          {item.customText && (
            <span>Text: "{item.customText}"</span>
          )}
        </div>
        <p className="text-sm mt-1">
          Designer: {item.designerName}
        </p>
      </div>
      
      {/* Price and quantity */}
      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-md">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none text-muted-foreground"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            -
          </Button>
          <span className="w-10 text-center">{item.quantity}</span>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none text-muted-foreground"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </Button>
        </div>
        
        <div className="w-20 text-right font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          className="text-destructive hover:text-destructive"
          onClick={() => removeFromCart(index)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
