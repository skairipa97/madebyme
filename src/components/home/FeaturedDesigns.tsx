
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDesigns } from "@/context/DesignContext";
import { DesignCard } from "@/components/designs/DesignCard";

export function FeaturedDesigns() {
  const { designs } = useDesigns();
  const featuredDesigns = designs.slice(0, 4);

  return (
    <section className="py-16 bg-soft-purple">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Featured Designs</h2>
          <p className="text-muted-foreground">
            Discover unique clothing designs from independent creators
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/designs">
            <Button className="gradient-purple">
              View All Designs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
