
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, User, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("client1@example.com");
  const [password, setPassword] = useState("password");
  const [role, setRole] = useState<"client" | "designer">("client");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Get the redirect path from location state, or default to "/"
  const from = location.state?.from || "/";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      await login(email, password, role);
      navigate(from);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Log in to your account</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="client"
            value={role}
            onValueChange={(value) => setRole(value as "client" | "designer")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="client" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Client</span>
              </TabsTrigger>
              <TabsTrigger value="designer" className="flex items-center gap-1">
                <PenTool className="h-4 w-4" />
                <span>Designer</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Log in as a client to browse and customize designs.
              </p>
            </TabsContent>
            <TabsContent value="designer" className="mt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Log in as a designer to manage and upload your designs.
              </p>
            </TabsContent>
          </Tabs>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-2 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-purple-600 hover:text-purple-700"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Demo Accounts:</p>
            <p>Client: client1@example.com / password</p>
            <p>Designer: designer1@example.com / password</p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="gradient-purple w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </Button>
          
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-purple-600 font-medium hover:text-purple-700"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
