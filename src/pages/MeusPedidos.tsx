import { Package, Clock, CheckCircle, Truck, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MeusPedidos = () => {
  const orders = [
    {
      id: "PED-001",
      date: "15/01/2024",
      total: "R$ 1.250,00",
      status: "entregue",
      items: [
        { name: "Tinta Branca 18L", quantity: 2, price: "R$ 180,00" },
        { name: "Rolo de Pintura", quantity: 3, price: "R$ 25,00" },
        { name: "Fita Crepe", quantity: 5, price: "R$ 8,00" }
      ],
      deliveryDate: "18/01/2024"
    },
    {
      id: "PED-002",
      date: "20/01/2024",
      total: "R$ 890,00",
      status: "em_transito",
      items: [
        { name: "Cimento Portland", quantity: 10, price: "R$ 35,00" },
        { name: "Areia Média", quantity: 5, price: "R$ 45,00" },
        { name: "Brita", quantity: 3, price: "R$ 55,00" }
      ],
      deliveryDate: "25/01/2024"
    },
    {
      id: "PED-003",
      date: "25/01/2024",
      total: "R$ 2.100,00",
      status: "pendente",
      items: [
        { name: "Piso Porcelanato", quantity: 50, price: "R$ 35,00" },
        { name: "Argamassa", quantity: 8, price: "R$ 25,00" },
        { name: "Rejunte", quantity: 2, price: "R$ 15,00" }
      ],
      deliveryDate: "30/01/2024"
    },
    {
      id: "PED-004",
      date: "28/01/2024",
      total: "R$ 750,00",
      status: "entregue",
      items: [
        { name: "Furadeira", quantity: 1, price: "R$ 450,00" },
        { name: "Broca Conjunto", quantity: 1, price: "R$ 120,00" },
        { name: "Parafusos", quantity: 2, price: "R$ 90,00" }
      ],
      deliveryDate: "30/01/2024"
    }
  ];

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "entregue":
        return {
          label: "Entregue",
          icon: CheckCircle,
          color: "bg-green-100 text-green-800 border-green-200",
          bgColor: "bg-green-50"
        };
      case "em_transito":
        return {
          label: "Em Trânsito",
          icon: Truck,
          color: "bg-blue-100 text-blue-800 border-blue-200",
          bgColor: "bg-blue-50"
        };
      case "pendente":
        return {
          label: "Pendente",
          icon: Clock,
          color: "bg-orange-100 text-orange-800 border-orange-200",
          bgColor: "bg-orange-50"
        };
      default:
        return {
          label: "Desconhecido",
          icon: Package,
          color: "bg-gray-100 text-gray-800 border-gray-200",
          bgColor: "bg-gray-50"
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Back Button */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-3">
          <Link to="/">
            <Button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Meus Pedidos</h1>
            <p className="text-slate-600">
              Acompanhe o status e detalhes de todos os seus pedidos
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex justify-between items-center mb-8">
            <Badge variant="outline" className="text-sm">
              Total: {orders.length} pedidos
            </Badge>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={order.id} className={`${statusInfo.bgColor} border-l-4 border-l-primary`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Package className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{order.id}</span>
                        </div>
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Data do Pedido</p>
                        <p className="font-semibold">{order.date}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Order Items */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Itens do Pedido:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-sm">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="text-sm font-medium">{item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Order Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-sm text-muted-foreground">Data de Entrega</p>
                            <p className="font-semibold">{order.deliveryDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Total</p>
                            <p className="text-xl font-bold text-primary">{order.total}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>Ver Detalhes</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {orders.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nenhum pedido encontrado</h3>
                <p className="text-slate-600 mb-4">
                  Você ainda não fez nenhum pedido. Comece a comprar nossos produtos!
                </p>
                <Link to="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Ver Produtos
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MeusPedidos;
