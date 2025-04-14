
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Palette, Pencil, ShoppingBag } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Pencil className="h-12 w-12 text-purple-500" />,
      title: "Des créateurs marocains talentueux",
      description: "Nos designers locaux créent des vêtements uniques qui mélangent style moderne et tradition marocaine"
    },
    {
      icon: <Palette className="h-12 w-12 text-purple-500" />,
      title: "Personnalisez votre style",
      description: "Adaptez les designs selon vos préférences tout en gardant l'essence du style marocain"
    },
    {
      icon: <ShoppingBag className="h-12 w-12 text-purple-500" />,
      title: "Livraison dans tout le Maroc",
      description: "Profitez d'une livraison rapide et sécurisée partout au Maroc"
    }
  ];

  return (
    <Layout>
      <div className="container py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Comment ça marche</h1>
          <p className="text-lg text-muted-foreground">
            Découvrez comment MadeByMe révolutionne la mode au Maroc en connectant designers et clients
          </p>
        </div>

        <div className="grid gap-12 my-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-shrink-0 w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center">
                {step.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/signup">
            <Button size="lg" className="gradient-purple">
              Rejoignez MadeByMe
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
