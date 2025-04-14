
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { DesignUploadForm } from "@/components/designers/DesignUploadForm";

export default function UploadPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  // Redirect non-designers away
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: "/upload" } });
    } else if (user && user.role !== "designer") {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);
  
  if (!isAuthenticated || (user && user.role !== "designer")) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-semibold mb-2">Upload New Design</h1>
        <p className="text-muted-foreground mb-8">
          Share your creativity with customers worldwide and earn from each sale
        </p>
        
        <DesignUploadForm />
      </div>
    </Layout>
  );
}
