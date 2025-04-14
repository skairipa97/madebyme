
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Design, DesignColor, DesignSize, useDesigns } from "@/context/DesignContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { 
  ShoppingBag, 
  Heart, 
  Share, 
  Eye, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type DesignDetailProps = {
  design: Design;
};

export function DesignDetail({ design }: DesignDetailProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { startCustomization, updateCustomization, customization } = useDesigns();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState<DesignColor>(design.availableColors[0]);
  const [selectedSize, setSelectedSize] = useState<DesignSize>(design.availableSizes[1] || design.availableSizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState("");
  
  // Start customization if not already started
  if (!customization || customization.designId !== design.id) {
    startCustomization(design.id);
  }
  
  const handleColorChange = (color: DesignColor) => {
    setSelectedColor(color);
    updateCustomization({ selectedColor: color });
  };
  
  const handleSizeChange = (size: DesignSize) => {
    setSelectedSize(size);
    updateCustomization({ selectedSize: size });
  };
  
  const handleQuantityChange = (value: string) => {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity) || newQuantity < 1) return;
    
    setQuantity(newQuantity);
    updateCustomization({ quantity: newQuantity });
  };
  
  const handleTextChange = (text: string) => {
    setCustomText(text);
    updateCustomization({ customText: text });
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/customize/${design.id}` } });
      return;
    }
    
    addToCart({
      designId: design.id,
      selectedColor,
      selectedSize,
      quantity,
      customText,
      title: design.title,
      price: design.price,
      imageUrl: design.imageUrl,
      designerName: design.designerName,
      designerId: design.designerId
    });
    
    navigate("/cart");
  };

  return (
    <div className="container py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
            <img 
              src={design.imageUrl} 
              alt={design.title} 
              className="h-full w-full object-contain"
            />
            
            {/* Preview controls (decoration only in this demo) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur">
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur">
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline" className="bg-white/80 backdrop-blur">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Thumbnail previews (decoration only in this demo) */}
          <div className="flex gap-2 overflow-auto py-1">
            <div className="aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md border bg-white p-1 ring-2 ring-purple-500">
              <img 
                src={design.imageUrl} 
                alt={design.title} 
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md border bg-white p-1">
              <div className="h-full w-full bg-neutral-100 flex items-center justify-center text-muted-foreground">
                Back
              </div>
            </div>
            <div className="aspect-square w-20 flex-shrink-0 cursor-pointer rounded-md border bg-white p-1">
              <div className="h-full w-full bg-neutral-100 flex items-center justify-center text-muted-foreground">
                Detail
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-purple-500 border-purple-200">
                {design.availableSizes.length} Sizes
              </Badge>
              <Badge variant="outline" className="text-purple-500 border-purple-200">
                {design.availableColors.length} Colors
              </Badge>
              <Badge variant="outline" className="text-purple-500 border-purple-200">
                {design.salesCount} Sold
              </Badge>
            </div>
            
            <h1 className="text-3xl font-semibold">{design.title}</h1>
            <p className="text-lg text-muted-foreground">by {design.designerName}</p>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold">${design.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">Designers earn 80% of the price</span>
          </div>
          
          <p className="text-muted-foreground">{design.description}</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Color</label>
              <div className="flex flex-wrap gap-2">
                {design.availableColors.map((color, i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                      selectedColor.hex === color.hex 
                        ? 'border-purple-500 scale-110' 
                        : 'border-neutral-200 hover:border-purple-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Size</label>
              <div className="flex flex-wrap gap-2">
                {design.availableSizes.map((size) => (
                  <div 
                    key={size}
                    className={`w-10 h-10 rounded-md flex items-center justify-center cursor-pointer border text-sm font-medium transition-all ${
                      selectedSize === size 
                        ? 'border-purple-500 bg-purple-50 text-purple-700' 
                        : 'border-neutral-200 hover:border-purple-200'
                    }`}
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Custom Text (Optional)</label>
              <Input 
                placeholder="Add your custom text..."
                value={customText}
                onChange={(e) => handleTextChange(e.target.value)}
                maxLength={30}
              />
              <p className="text-xs text-muted-foreground mt-1">Maximum 30 characters</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-24">
                <label className="text-sm font-medium mb-1 block">Quantity</label>
                <div className="flex border rounded-md">
                  <button 
                    className="px-3 py-1 border-r"
                    onClick={() => handleQuantityChange(String(Math.max(1, quantity - 1)))}
                  >
                    -
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="w-full p-1 text-center" 
                  />
                  <button 
                    className="px-3 py-1 border-l"
                    onClick={() => handleQuantityChange(String(quantity + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <Button 
                  className="w-full gradient-purple"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Heart className="mr-1 h-4 w-4" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-1 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional info tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="py-4">
            <div className="prose max-w-none">
              <p>
                This beautiful design from {design.designerName} is made with high-quality materials
                and printed on demand just for you. The custom clothing is comfortable, durable, and
                will maintain its vibrant colors through multiple washes.
              </p>
              <ul>
                <li>100% premium cotton fabric</li>
                <li>Eco-friendly printing process</li>
                <li>Pre-shrunk to maintain size and shape</li>
                <li>Machine washable (cold, inside out)</li>
                <li>Made to order - please allow 2-5 business days for production</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="py-4">
            <div className="prose max-w-none">
              <p>
                We ship worldwide from our production facilities in the USA, Europe, and Asia.
                Your order will be processed and shipped within 2-5 business days.
              </p>
              <h3>Shipping Times</h3>
              <ul>
                <li>USA: 3-7 business days</li>
                <li>Canada & Europe: 5-10 business days</li>
                <li>Rest of World: 7-14 business days</li>
              </ul>
              <p>
                Tracking information will be provided once your order ships.
                Please note that shipping times may be affected by customs processing for international orders.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="prose max-w-none">
              <p>No reviews yet. Be the first to review this design!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
