import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext";
import { GOOGLE_CLIENT_ID } from "@/config/socialAuth";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/EsqueciSenha";
import MinhaConta from "./pages/MinhaConta";
import MeusPedidos from "./pages/MeusPedidos";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import Pagamento from "./pages/Pagamento";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import WishlistPage from "./pages/WishlistPage";
import Assistencia from "./pages/Assistencia";
import Entrega from "./pages/Entrega";
import PosVenda from "./pages/PosVenda";
import SobreNos from "./pages/SobreNos";
import Ofertas from "./pages/Ofertas";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosDeUso from "./pages/TermosDeUso";
import FAQ from "./pages/FAQ";
import RelatorioVendas from "./pages/RelatorioVendas";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <TooltipProvider>
        <UserProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="/esqueci-senha" element={<EsqueciSenha />} />
                <Route path="/minha-conta" element={<MinhaConta />} />
                <Route path="/meus-pedidos" element={<MeusPedidos />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pagamento" element={<Pagamento />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produto/:id" element={<ProdutoDetalhe />} />
                <Route path="/assistencia" element={<Assistencia />} />
                <Route path="/entrega" element={<Entrega />} />
                <Route path="/pos-venda" element={<PosVenda />} />
                <Route path="/sobre-nos" element={<SobreNos />} />
                <Route path="/ofertas" element={<Ofertas />} />
                <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
                <Route path="/termos-de-uso" element={<TermosDeUso />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/desejos" element={<WishlistPage />} />
                <Route path="/relatorio-vendas" element={<RelatorioVendas />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </UserProvider>
      </TooltipProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>
);

export default App;