import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, Clock, Award, Users, CheckCircle } from "lucide-react";

const Hero = () => {
  const stats = [
    { number: "15+", label: "Anos de Experiência" },
    { number: "5000+", label: "Clientes Satisfeitos" },
    { number: "24h", label: "Atendimento" }
  ];

  const features = [
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Entregamos em toda a região"
    },
    {
      icon: Shield,
      title: "Qualidade Garantida", 
      description: "Produtos certificados"
    },
    {
      icon: Users,
      title: "Atendimento Especializado",
      description: "Consultoria técnica gratuita"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Award className="h-4 w-4" />
              <span>Líder em Materiais de Construção</span>
            </div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-foreground">Materiais de</span>
                <br />
                <span className="text-primary">Construção</span>
                <br />
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  Profissionais
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Transforme seus projetos em realidade com materiais de alta qualidade, 
                preços competitivos e o melhor atendimento da região.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 h-auto">
                <span>Explorar Catálogo</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto border-2">
                Solicitar Orçamento
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            {/* Main card */}
            <div className="relative bg-card border border-border rounded-3xl p-8 shadow-lg">
              {/* Logo section */}
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <img 
                    src="/lovable-uploads/32dfc200-6c26-41e4-a389-de2afd7b4eb9.png" 
                    alt="COISA Logo" 
                    className="w-16 h-auto"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground">COISA</h3>
                <p className="text-accent font-medium">Materiais de Construção</p>
              </div>

              {/* Features grid */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-xl bg-muted/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Trust indicator */}
              <div className="mt-8 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground mb-2">Certificações e Qualidade</p>
                <div className="flex justify-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-accent/10 rounded flex items-center justify-center">
                    <Award className="h-4 w-4 text-accent" />
                  </div>
                  <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center">
              <Truck className="h-8 w-8 text-accent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;