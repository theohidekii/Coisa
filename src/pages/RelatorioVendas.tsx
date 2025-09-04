import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SalesChart from "@/components/SalesChart";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RelatorioVendas = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/admin">
              <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span>Voltar</span>
              </Button>
            </Link>
          </div>

          <SalesChart />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RelatorioVendas;
