
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useDesigns, DesignColor, DesignSize } from "@/context/DesignContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UploadCloud, Plus, X, DollarSign, Check, Loader2 } from "lucide-react";

const initialColors: DesignColor[] = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Navy", hex: "#0A192F" },
];

const availableSizes: DesignSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

export function DesignUploadForm() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addDesign } = useDesigns();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [colors, setColors] = useState<DesignColor[]>(initialColors);
  const [selectedSizes, setSelectedSizes] = useState<DesignSize[]>(["S", "M", "L", "XL"]);
  const [featured, setFeatured] = useState(false);
  
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, this would upload to a server/storage
    // For this demo, we'll use a URL.createObjectURL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // In a real app, we'd get a real URL back from the server
    // For now, we'll just use a fake one
    setImageUrl(url);
  };
  
  // Add a new color
  const addColor = () => {
    setColors([...colors, { name: "New Color", hex: "#cccccc" }]);
  };
  
  // Update color
  const updateColor = (index: number, field: "name" | "hex", value: string) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };
  
  // Remove color
  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };
  
  // Toggle size selection
  const toggleSize = (size: DesignSize) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!title || !description || !price || !imageUrl || selectedSizes.length === 0 || colors.length === 0) {
      return; // Form validation would be better in a real app
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      addDesign({
        title,
        description,
        designerId: user.id,
        designerName: user.name,
        imageUrl,
        price: parseFloat(price),
        availableColors: colors,
        availableSizes: selectedSizes,
        featured
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting design:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upload New Design</CardTitle>
        <CardDescription>
          Share your creativity with customers around the world. You'll earn 80% of each sale.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Design Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Design Image</Label>
            <div className="flex items-center gap-4">
              <div
                className={`aspect-square w-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors ${
                  previewUrl ? "border-purple-200" : "border-muted"
                }`}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground text-center px-2">
                      Click to upload
                    </span>
                  </>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Recommended: Square format, at least 1000x1000px, less than 5MB.
                </p>
              </div>
            </div>
          </div>
          
          {/* Design Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Design Title</Label>
              <Input
                id="title"
                placeholder="e.g., Urban Street Tee"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  placeholder="29.99"
                  className="pl-9"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">
                You'll earn ${price ? (parseFloat(price) * 0.8).toFixed(2) : "0.00"} per sale (80%)
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your design, materials, style, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            />
          </div>
          
          {/* Available Colors */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Available Colors</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addColor}
                disabled={colors.length >= 6}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Color
              </Button>
            </div>
            
            <div className="space-y-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={color.name}
                    onChange={(e) => updateColor(index, "name", e.target.value)}
                    placeholder="Color name"
                    className="flex-1"
                  />
                  <input
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateColor(index, "hex", e.target.value)}
                    className="w-12 h-8 border rounded cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeColor(index)}
                    disabled={colors.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Available Sizes */}
          <div className="space-y-3">
            <Label>Available Sizes</Label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size) => (
                <div
                  key={size}
                  className={`flex h-9 px-3 items-center justify-center rounded-md border text-sm font-medium cursor-pointer transition-colors ${
                    selectedSizes.includes(size)
                      ? "bg-purple-100 border-purple-500 text-purple-900"
                      : "border-muted bg-transparent hover:bg-muted/30"
                  }`}
                  onClick={() => toggleSize(size)}
                >
                  {selectedSizes.includes(size) && (
                    <Check className="h-3.5 w-3.5 mr-1.5 text-purple-700" />
                  )}
                  {size}
                </div>
              ))}
            </div>
          </div>
          
          {/* Featured Option */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="featured" 
              checked={featured}
              onCheckedChange={(checked) => setFeatured(!!checked)}
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Feature this design on the homepage (optional)
            </Label>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="gradient-purple"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Design"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
