
import { Link } from "react-router-dom";
import { Design } from "@/context/DesignContext";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

type DesignCardProps = {
  design: Design;
  featured?: boolean;
};

export function DesignCard({ design, featured = false }: DesignCardProps) {
  return (
    <Card className={`overflow-hidden card-hover ${featured ? 'border-purple-200' : ''}`}>
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={design.imageUrl} 
          alt={design.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-purple-500">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-lg leading-tight">{design.title}</h3>
            <p className="text-sm text-muted-foreground">by {design.designerName}</p>
          </div>
          <span className="font-semibold">${design.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{design.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {design.availableColors.slice(0, 3).map((color, i) => (
              <div 
                key={i}
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {design.availableColors.length > 3 && (
              <div className="text-xs text-muted-foreground flex items-center">
                +{design.availableColors.length - 3}
              </div>
            )}
          </div>
          <Link to={`/customize/${design.id}`}>
            <Button size="sm" className="rounded-full">
              <Eye className="h-4 w-4 mr-1" /> Customize
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
