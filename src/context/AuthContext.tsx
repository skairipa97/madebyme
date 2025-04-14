
import React, { createContext, useContext, useState, useEffect } from "react";

// Define user types with their specific fields
export type Designer = {
  id: string;
  email: string;
  name: string;
  role: "designer";
  bio?: string;
  earnings: number;
  designsCount: number;
};

export type Client = {
  id: string;
  email: string;
  name: string;
  role: "client";
  orders: number;
};

export type User = Designer | Client;

// Define auth context state
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: "designer" | "client") => Promise<void>;
  signup: (email: string, password: string, name: string, role: "designer" | "client") => Promise<void>;
  logout: () => void;
};

// Mock data for demonstration
const mockDesigners: Designer[] = [
  {
    id: "d1",
    email: "designer1@example.com",
    name: "Alex Johnson",
    role: "designer",
    bio: "Fashion designer specializing in streetwear and casual clothing",
    earnings: 2450,
    designsCount: 12
  },
  {
    id: "d2",
    email: "designer2@example.com",
    name: "Jamie Smith",
    role: "designer",
    bio: "Contemporary designs with sustainable materials",
    earnings: 1875,
    designsCount: 8
  }
];

const mockClients: Client[] = [
  {
    id: "c1",
    email: "client1@example.com",
    name: "Taylor Wilson",
    role: "client",
    orders: 3
  },
  {
    id: "c2",
    email: "client2@example.com",
    name: "Jordan Lee",
    role: "client",
    orders: 5
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("couture_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function - in a real app, this would make an API call
  const login = async (email: string, password: string, role: "designer" | "client") => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let foundUser: User | undefined;
    
    if (role === "designer") {
      foundUser = mockDesigners.find(d => d.email === email);
    } else {
      foundUser = mockClients.find(c => c.email === email);
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("couture_user", JSON.stringify(foundUser));
    } else {
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  // Signup function - in a real app, this would make an API call
  const signup = async (email: string, password: string, name: string, role: "designer" | "client") => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newId = `${role[0]}${Math.floor(Math.random() * 10000)}`;
    
    let newUser: User;
    
    if (role === "designer") {
      newUser = {
        id: newId,
        email,
        name,
        role: "designer",
        bio: "",
        earnings: 0,
        designsCount: 0
      };
    } else {
      newUser = {
        id: newId,
        email,
        name,
        role: "client",
        orders: 0
      };
    }
    
    setUser(newUser);
    localStorage.setItem("couture_user", JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("couture_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
