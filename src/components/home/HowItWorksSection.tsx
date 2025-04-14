
import { PenTool, Heart, ShoppingCart, Truck, Star, Scissors } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <PenTool className="h-12 w-12 text-purple-500" />,
      title: "Création Unique",
      description: "Nos designers créent des pièces uniques inspirées du patrimoine marocain"
    },
    {
      icon: <Scissors className="h-12 w-12 text-purple-500" />,
      title: "Artisanat Local",
      description: "Fabriqué à la main par nos artisans qualifiés de Casablanca"
    },
    {
      icon: <Heart className="h-12 w-12 text-purple-500" />,
      title: "Personnalisation",
      description: "Adaptez chaque design selon vos préférences et votre style"
    },
    {
      icon: <Star className="h-12 w-12 text-purple-500" />,
      title: "Qualité Garantie",
      description: "Des matériaux premium et un savoir-faire artisanal exceptionnel"
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-purple-500" />,
      title: "Commande Simple",
      description: "Processus de commande facile et paiement sécurisé"
    },
    {
      icon: <Truck className="h-12 w-12 text-purple-500" />,
      title: "Livraison Rapide",
      description: "Livraison express partout au Maroc sous 2-4 jours"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Comment ça Marche?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment MadeByMe révolutionne la mode au Maroc en connectant 
            les designers talentueux aux clients qui recherchent des pièces uniques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-purple-50 transition-colors"
            >
              <div className="mb-4 p-3 bg-purple-100 rounded-full">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
