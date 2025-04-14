
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-text">
          Your Design, Your Style
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          MadeByMe: Where creativity meets fashion. Design, customize, and wear your unique style.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/designs">
            <Button size="lg" className="gradient-purple">
              Explore Designs
            </Button>
          </Link>
          <Link to="/signup?role=designer">
            <Button size="lg" variant="outline">
              Become a Designer
            </Button>
          </Link>
        </div>
      </div>
      <div className="hidden md:block">
        {/* Optional: Add a hero image or illustration */}
        <img 
          src="/placeholder.svg" 
          alt="MadeByMe Custom Designs" 
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}
