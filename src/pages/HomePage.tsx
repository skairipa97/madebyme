import { Link } from "react-router-dom";
import { useDesigns } from "@/context/DesignContext";
import { Layout } from "@/components/layout/Layout";
import { DesignCard } from "@/components/designs/DesignCard";
import { Button } from "@/components/ui/button";
import { 
  PenTool, 
  Users, 
  User,
  Palette, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  ChevronRight 
} from "lucide-react";

export default function HomePage() {
  const { featuredDesigns } = useDesigns();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
        <div className="container py-16 md:py-24">
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
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=700" 
                alt="Custom clothing design" 
                className="rounded-lg shadow-xl object-cover w-full aspect-square md:aspect-auto md:h-[500px]"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium">300+ Designers</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 rounded-full bg-designer"></div>
                  <span className="text-sm font-medium">1200+ Designs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform connects creative designers with customers looking for unique, personalized clothing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Clients */}
            <div className="bg-purple-50 rounded-xl p-6 text-center hover-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Clients</h3>
              <ol className="text-left space-y-3 mt-4">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-medium text-sm">1</span>
                  <span>Browse unique designs from our community</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-medium text-sm">2</span>
                  <span>Customize colors, sizes, and add text</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-700 font-medium text-sm">3</span>
                  <span>Place your order and receive a one-of-a-kind item</span>
                </li>
              </ol>
              <Link to="/signup?role=client" className="mt-6 inline-block">
                <Button className="gradient-purple">
                  Join as a Client
                </Button>
              </Link>
            </div>
            
            {/* For Designers */}
            <div className="bg-designer-light rounded-xl p-6 text-center hover-shadow">
              <div className="w-16 h-16 bg-designer/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="h-8 w-8 text-designer" />
              </div>
              <h3 className="text-xl font-semibold mb-2">For Designers</h3>
              <ol className="text-left space-y-3 mt-4">
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-designer/20 text-designer font-medium text-sm">1</span>
                  <span>Upload your clothing designs to our platform</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-designer/20 text-designer font-medium text-sm">2</span>
                  <span>Set your prices and available options</span>
                </li>
                <li className="flex gap-2">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-designer/20 text-designer font-medium text-sm">3</span>
                  <span>Earn 80% of each sale with no overhead costs</span>
                </li>
              </ol>
              <Link to="/signup?role=designer" className="mt-6 inline-block">
                <Button className="bg-designer text-white hover:bg-designer/90">
                  Join as a Designer
                </Button>
              </Link>
            </div>
            
            {/* Business Model */}
            <div className="bg-client-light rounded-xl p-6 text-center hover-shadow">
              <div className="w-16 h-16 bg-client/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-client" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Platform</h3>
              <ul className="text-left space-y-3 mt-4">
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-client/20 text-client flex items-center justify-center">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                  <span>We connect designers with clients worldwide</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-client/20 text-client flex items-center justify-center">
                    <ShoppingCart className="h-3.5 w-3.5" />
                  </div>
                  <span>We handle production, shipping, and payments</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-client/20 text-client flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5" />
                  </div>
                  <span>Designers keep 80% of each sale, we take 20%</span>
                </li>
              </ul>
              <Link to="/about" className="mt-6 inline-block">
                <Button className="bg-client text-white hover:bg-client/90">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Designs Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container">
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Designs</h2>
              <p className="text-muted-foreground mt-2">
                Discover our most popular custom clothing creations
              </p>
            </div>
            <Link to="/designs" className="flex items-center text-purple-600 font-medium hover:text-purple-700">
              <span>View all designs</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDesigns.map((design) => (
              <DesignCard key={design.id} design={design} featured />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from designers and clients who have used our platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Client Testimonial */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah K.</h4>
                  <p className="text-sm text-muted-foreground">Client</p>
                </div>
              </div>
              <p className="italic">
                "I found the most amazing hoodie design and was able to customize it with my favorite colors. The quality exceeded my expectations!"
              </p>
            </div>
            
            {/* Designer Testimonial */}
            <div className="bg-gradient-to-br from-designer-light to-orange-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-designer/20 flex items-center justify-center">
                  <PenTool className="h-6 w-6 text-designer" />
                </div>
                <div>
                  <h4 className="font-semibold">Miguel R.</h4>
                  <p className="text-sm text-muted-foreground">Designer</p>
                </div>
              </div>
              <p className="italic">
                "As a designer, this platform has given me the freedom to focus on creativity while handling all the production logistics. My earnings have doubled!"
              </p>
            </div>
            
            {/* Another Client Testimonial */}
            <div className="bg-gradient-to-br from-client-light to-blue-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-client/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-client" />
                </div>
                <div>
                  <h4 className="font-semibold">Taylor W.</h4>
                  <p className="text-sm text-muted-foreground">Client</p>
                </div>
              </div>
              <p className="italic">
                "Being able to add my own text to the designs makes each piece feel truly personal. I've ordered gifts for my entire family!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join our community today and discover a world of custom fashion possibilities
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/designs">
              <Button size="lg" variant="secondary">
                Browse Designs
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-neutral-100">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
