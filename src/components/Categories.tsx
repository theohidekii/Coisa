import { Home, Wrench, Lightbulb, Droplets, Car, ChevronRight, Paintbrush, Zap, Droplets as WaterDrop, Square, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Tintas e Vernizes",
      icon: Paintbrush,
      description: "Tintas, vernizes e produtos de acabamento"
    },
    {
      id: 2,
      name: "Ferramentas",
      icon: Wrench,
      description: "Ferramentas profissionais e domésticas"
    },
    {
      id: 3,
      name: "Material Elétrico",
      icon: Zap,
      description: "Produtos e materiais elétricos"
    },
    {
      id: 4,
      name: "Material Hidráulico",
      icon: WaterDrop,
      description: "Tubos, conexões e acessórios hidráulicos"
    },
    {
      id: 5,
      name: "Pisos e Revestimentos",
      icon: Square,
      description: "Pisos, azulejos e revestimentos"
    },
    {
      id: 6,
      name: "Cimentos e Argamassas",
      icon: Package,
      description: "Cimentos, argamassas e produtos de assentamento"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1"></div>
          <h2 className="text-3xl font-bold text-foreground text-center flex-1">Navegue por Categorias</h2>
          <div className="flex-1 flex justify-end">
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Ver Todas <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className="group cursor-pointer bg-background rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                                         <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;