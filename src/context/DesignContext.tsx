
import React, { createContext, useContext, useState, useEffect } from "react";

export type DesignColor = {
  name: string;
  hex: string;
};

export type DesignSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Design = {
  id: string;
  title: string;
  description: string;
  designerId: string;
  designerName: string;
  imageUrl: string;
  price: number;
  availableColors: DesignColor[];
  availableSizes: DesignSize[];
  featured: boolean;
  createdAt: string;
  salesCount: number;
};

export type CustomizedDesign = {
  designId: string;
  selectedColor: DesignColor;
  selectedSize: DesignSize;
  quantity: number;
  customText?: string;
};

type DesignContextType = {
  designs: Design[];
  featuredDesigns: Design[];
  currentDesign: Design | null;
  customization: CustomizedDesign | null;
  addDesign: (design: Omit<Design, "id" | "createdAt" | "salesCount">) => void;
  getDesignById: (id: string) => Design | undefined;
  setCurrentDesign: (design: Design | null) => void;
  startCustomization: (designId: string) => void;
  updateCustomization: (updates: Partial<CustomizedDesign>) => void;
  clearCustomization: () => void;
};

// Mock data
const mockDesigns: Design[] = [
  {
    id: "design1",
    title: "Urban Street Tee",
    description: "Modern streetwear with a minimalist design, perfect for casual outings.",
    designerId: "d1",
    designerName: "Alex Johnson",
    imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=500",
    price: 49.99,
    availableColors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#0A192F" }
    ],
    availableSizes: ["S", "M", "L", "XL"],
    featured: true,
    createdAt: "2023-09-15T12:00:00Z",
    salesCount: 24
  },
  {
    id: "design2",
    title: "Eco Friendly Hoodie",
    description: "Sustainable and stylish hoodie made from organic cotton.",
    designerId: "d2",
    designerName: "Jamie Smith",
    imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=500",
    price: 79.99,
    availableColors: [
      { name: "Grey", hex: "#808080" },
      { name: "Green", hex: "#2F4F4F" },
      { name: "Beige", hex: "#F5F5DC" }
    ],
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    createdAt: "2023-10-20T10:30:00Z",
    salesCount: 18
  },
  {
    id: "design3",
    title: "Vintage Logo Sweatshirt",
    description: "Retro-inspired design with a comfortable modern fit.",
    designerId: "d1",
    designerName: "Alex Johnson",
    imageUrl: "https://images.unsplash.com/photo-1622445275576-721325763afe?q=80&w=500",
    price: 64.99,
    availableColors: [
      { name: "Red", hex: "#B22222" },
      { name: "Blue", hex: "#4169E1" },
      { name: "Black", hex: "#000000" }
    ],
    availableSizes: ["M", "L", "XL"],
    featured: false,
    createdAt: "2023-11-05T14:15:00Z",
    salesCount: 12
  },
  {
    id: "design4",
    title: "Minimal Pattern Dress",
    description: "Elegant dress with subtle geometric patterns.",
    designerId: "d2",
    designerName: "Jamie Smith",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500",
    price: 89.99,
    availableColors: [
      { name: "Black", hex: "#000000" },
      { name: "Burgundy", hex: "#800020" }
    ],
    availableSizes: ["XS", "S", "M", "L"],
    featured: true,
    createdAt: "2023-12-01T09:45:00Z",
    salesCount: 8
  }
];

// Create context
const DesignContext = createContext<DesignContextType | undefined>(undefined);

// Provider component
export const DesignProvider = ({ children }: { children: React.ReactNode }) => {
  const [designs, setDesigns] = useState<Design[]>(mockDesigns);
  const [currentDesign, setCurrentDesign] = useState<Design | null>(null);
  const [customization, setCustomization] = useState<CustomizedDesign | null>(null);

  // Get featured designs
  const featuredDesigns = designs.filter(design => design.featured);

  // Add a new design
  const addDesign = (design: Omit<Design, "id" | "createdAt" | "salesCount">) => {
    const newDesign: Design = {
      ...design,
      id: `design${designs.length + 1}`,
      createdAt: new Date().toISOString(),
      salesCount: 0
    };
    
    setDesigns([...designs, newDesign]);
  };

  // Get design by ID
  const getDesignById = (id: string) => {
    return designs.find(design => design.id === id);
  };

  // Start customization of a design
  const startCustomization = (designId: string) => {
    const design = getDesignById(designId);
    if (!design) return;
    
    setCurrentDesign(design);
    setCustomization({
      designId,
      selectedColor: design.availableColors[0],
      selectedSize: design.availableSizes[1], // Default to medium if available
      quantity: 1
    });
  };

  // Update customization
  const updateCustomization = (updates: Partial<CustomizedDesign>) => {
    if (!customization) return;
    
    setCustomization({
      ...customization,
      ...updates
    });
  };

  // Clear customization
  const clearCustomization = () => {
    setCurrentDesign(null);
    setCustomization(null);
  };

  return (
    <DesignContext.Provider
      value={{
        designs,
        featuredDesigns,
        currentDesign,
        customization,
        addDesign,
        getDesignById,
        setCurrentDesign,
        startCustomization,
        updateCustomization,
        clearCustomization
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

// Custom hook to use the design context
export const useDesigns = () => {
  const context = useContext(DesignContext);
  if (context === undefined) {
    throw new Error("useDesigns must be used within a DesignProvider");
  }
  return context;
};
