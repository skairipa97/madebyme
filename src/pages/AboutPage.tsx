
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">À propos de MadeByMe</h1>
          
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Fondée à Casablanca, MadeByMe est une plateforme innovante qui célèbre la créativité 
              et le talent des designers marocains. Notre mission est de créer un pont entre la tradition 
              artisanale marocaine et la mode contemporaine.
            </p>

            <div className="my-12">
              <img 
                src="https://images.unsplash.com/photo-1466442929976-97f336a657be"
                alt="Morocco architecture"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            <h2 className="text-2xl font-semibold mb-4">Notre Vision</h2>
            <p className="text-muted-foreground mb-6">
              Nous aspirons à devenir la première destination en ligne pour la mode personnalisée au Maroc, 
              en mettant en valeur le talent créatif local tout en offrant aux clients la possibilité de 
              personnaliser leurs vêtements selon leurs préférences.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Notre Engagement</h2>
            <p className="text-muted-foreground mb-6">
              MadeByMe s'engage à soutenir l'économie créative marocaine en offrant une plateforme qui 
              permet aux designers locaux de prospérer tout en préservant notre riche patrimoine culturel.
            </p>

            <div className="text-center mt-12">
              <Link to="/contact">
                <Button size="lg" className="gradient-purple">
                  Contactez-nous
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
