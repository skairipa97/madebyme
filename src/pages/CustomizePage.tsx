
import { useParams, useNavigate } from "react-router-dom";
import { useDesigns } from "@/context/DesignContext";
import { Layout } from "@/components/layout/Layout";
import { DesignDetail } from "@/components/designs/DesignDetail";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CustomizePage() {
  const { designId } = useParams<{ designId: string }>();
  const navigate = useNavigate();
  const { getDesignById } = useDesigns();
  
  const design = designId ? getDesignById(designId) : undefined;
  
  if (!design) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Design Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the design you're looking for.
          </p>
          <Button onClick={() => navigate("/designs")} className="gradient-purple">
            Browse All Designs
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        
        <DesignDetail design={design} />
      </div>
    </Layout>
  );
}
