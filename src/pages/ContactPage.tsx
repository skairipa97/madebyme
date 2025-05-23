
import { Layout } from "@/components/layout/Layout";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";

export default function ContactPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Contactez-nous</h1>
            <p className="text-muted-foreground mb-6">
              Nous sommes là pour vous aider. Remplissez le formulaire ou contactez-nous directement.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:contact@madebyme.ma" className="hover:text-purple-700">
                      contact@madebyme.ma
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Nous répondons à tous les emails sous 24 heures
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Téléphone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+212522123456" className="hover:text-purple-700">
                      +212 522 12 34 56
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Du lundi au vendredi, 9h - 18h
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Notre adresse</h3>
                  <p className="text-muted-foreground">
                    123 Boulevard Mohammed V<br />
                    Quartier des Affaires<br />
                    20250 Casablanca, Maroc
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Follow Us</h3>
              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="rounded-full hover:text-purple-700 hover:border-purple-700">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:text-purple-700 hover:border-purple-700">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:text-purple-700 hover:border-purple-700">
                  <Facebook className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
      
      {/* Map Embed (placeholder) */}
      <div className="h-80 bg-neutral-100 w-full mt-8">
        <div className="container h-full flex items-center justify-center border">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>Map would be embedded here in a real application</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
