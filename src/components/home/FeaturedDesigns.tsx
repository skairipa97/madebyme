
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDesigns } from "@/context/DesignContext";
import { DesignCard } from "@/components/designs/DesignCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function FeaturedDesigns() {
  const { designs } = useDesigns();
  const featuredDesigns = designs.slice(0, 6);

  return (
    <section className="py-16 bg-soft-purple">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Designs Tendance</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos créations uniques qui mélangent tradition marocaine et modernité,
            faites à la main par nos artisans talentueux de Casablanca
          </p>
        </div>

        <div className="mx-auto max-w-5xl px-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredDesigns.map((design) => (
                <CarouselItem key={design.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <DesignCard design={design} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Link to="/designs">
            <Button className="gradient-purple" size="lg">
              Voir Tous les Designs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
