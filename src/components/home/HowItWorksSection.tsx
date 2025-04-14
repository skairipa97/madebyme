
import { Heart, PenTool, ShoppingCart } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <PenTool className="h-8 w-8 text-purple-500" />,
      title: "Design",
      description: "Designers create unique clothing designs on our platform"
    },
    {
      icon: <Heart className="h-8 w-8 text-purple-500" />,
      title: "Customize",
      description: "Clients personalize designs to match their style"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-purple-500" />,
      title: "Purchase",
      description: "Buy custom designs and support independent creators"
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How MadeByMe Works</h2>
          <p className="text-muted-foreground">
            A seamless platform connecting designers and fashion enthusiasts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-4">
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
