import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, BarChart3, Target, Award, Calendar, ArrowLeft } from "lucide-react";

interface SalesData {
  month: string;
  sales: number;
  orders: number;
  customers: number;
  growth: number;
  topProducts: Array<{
    name: string;
    quantity: number;
    revenue: number;
  }>;
  categories: Array<{
    name: string;
    percentage: number;
  }>;
}

interface DailySalesData {
  day: number;
  sales: number;
  orders: number;
  customers: number;
}

const SalesChart = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>("Março 2024");
  const [showDailyView, setShowDailyView] = useState<boolean>(false);
  const [selectedMonthForDaily, setSelectedMonthForDaily] = useState<string>("");

  // Dados simulados de vendas mensais
  const salesData: Record<string, SalesData> = {
    "Janeiro 2024": {
      month: "Janeiro 2024",
      sales: 125000,
      orders: 342,
      customers: 289,
      growth: 12.5,
      topProducts: [
        { name: "Tinta Acrílica Premium", quantity: 156, revenue: 15600 },
        { name: "Furadeira Bosch Professional", quantity: 89, revenue: 26700 },
        { name: "Cimento CPII 50kg", quantity: 234, revenue: 5850 },
        { name: "Piso Cerâmico 60x60", quantity: 67, revenue: 3075 }
      ],
      categories: [
        { name: "Tintas e Vernizes", percentage: 35 },
        { name: "Ferramentas", percentage: 25 },
        { name: "Material Hidráulico", percentage: 20 },
        { name: "Pisos e Revestimentos", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Fevereiro 2024": {
      month: "Fevereiro 2024",
      sales: 138000,
      orders: 378,
      customers: 312,
      growth: 10.4,
      topProducts: [
        { name: "Vaso Sanitário Completo", quantity: 78, revenue: 14760 },
        { name: "Kit Ferramentas 100 Peças", quantity: 45, revenue: 6750 },
        { name: "Tinta Acrílica Premium", quantity: 134, revenue: 13400 },
        { name: "Material Elétrico", quantity: 123, revenue: 6150 }
      ],
      categories: [
        { name: "Material Hidráulico", percentage: 30 },
        { name: "Ferramentas", percentage: 28 },
        { name: "Tintas e Vernizes", percentage: 22 },
        { name: "Material Elétrico", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Março 2024": {
      month: "Março 2024",
      sales: 152000,
      orders: 415,
      customers: 356,
      growth: 10.1,
      topProducts: [
        { name: "Furadeira Bosch Professional", quantity: 112, revenue: 33600 },
        { name: "Cimento CPII 50kg", quantity: 289, revenue: 7225 },
        { name: "Piso Cerâmico 60x60", quantity: 89, revenue: 4095 },
        { name: "Tinta Acrílica Premium", quantity: 167, revenue: 16700 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 32 },
        { name: "Cimentos e Argamassas", percentage: 25 },
        { name: "Tintas e Vernizes", percentage: 20 },
        { name: "Pisos e Revestimentos", percentage: 18 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Abril 2024": {
      month: "Abril 2024",
      sales: 145000,
      orders: 398,
      customers: 334,
      growth: -4.6,
      topProducts: [
        { name: "Tinta Acrílica Premium", quantity: 145, revenue: 14500 },
        { name: "Material Hidráulico", quantity: 98, revenue: 4900 },
        { name: "Furadeira Bosch Professional", quantity: 67, revenue: 20100 },
        { name: "Vaso Sanitário Completo", quantity: 56, revenue: 10640 }
      ],
      categories: [
        { name: "Tintas e Vernizes", percentage: 28 },
        { name: "Material Hidráulico", percentage: 26 },
        { name: "Ferramentas", percentage: 24 },
        { name: "Pisos e Revestimentos", percentage: 17 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Maio 2024": {
      month: "Maio 2024",
      sales: 168000,
      orders: 456,
      customers: 389,
      growth: 15.9,
      topProducts: [
        { name: "Kit Ferramentas 100 Peças", quantity: 89, revenue: 13350 },
        { name: "Cimento CPII 50kg", quantity: 312, revenue: 7800 },
        { name: "Piso Cerâmico 60x60", quantity: 123, revenue: 5655 },
        { name: "Material Elétrico", quantity: 156, revenue: 7800 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 30 },
        { name: "Cimentos e Argamassas", percentage: 25 },
        { name: "Material Elétrico", percentage: 22 },
        { name: "Pisos e Revestimentos", percentage: 18 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Junho 2024": {
      month: "Junho 2024",
      sales: 182000,
      orders: 489,
      customers: 412,
      growth: 8.3,
      topProducts: [
        { name: "Furadeira Bosch Professional", quantity: 134, revenue: 40200 },
        { name: "Tinta Acrílica Premium", quantity: 178, revenue: 17800 },
        { name: "Vaso Sanitário Completo", quantity: 89, revenue: 16910 },
        { name: "Material Hidráulico", quantity: 145, revenue: 7250 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 35 },
        { name: "Tintas e Vernizes", percentage: 25 },
        { name: "Material Hidráulico", percentage: 20 },
        { name: "Pisos e Revestimentos", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Julho 2024": {
      month: "Julho 2024",
      sales: 175000,
      orders: 467,
      customers: 398,
      growth: -3.8,
      topProducts: [
        { name: "Tinta Acrílica Premium", quantity: 165, revenue: 16500 },
        { name: "Furadeira Bosch Professional", quantity: 98, revenue: 29400 },
        { name: "Cimento CPII 50kg", quantity: 278, revenue: 6950 },
        { name: "Material Hidráulico", quantity: 134, revenue: 6700 }
      ],
      categories: [
        { name: "Tintas e Vernizes", percentage: 30 },
        { name: "Ferramentas", percentage: 28 },
        { name: "Cimentos e Argamassas", percentage: 20 },
        { name: "Material Hidráulico", percentage: 17 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Agosto 2024": {
      month: "Agosto 2024",
      sales: 189000,
      orders: 512,
      customers: 445,
      growth: 8.0,
      topProducts: [
        { name: "Furadeira Bosch Professional", quantity: 145, revenue: 43500 },
        { name: "Tinta Acrílica Premium", quantity: 189, revenue: 18900 },
        { name: "Kit Ferramentas 100 Peças", quantity: 78, revenue: 11700 },
        { name: "Material Elétrico", quantity: 167, revenue: 8350 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 35 },
        { name: "Tintas e Vernizes", percentage: 25 },
        { name: "Material Elétrico", percentage: 20 },
        { name: "Pisos e Revestimentos", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Setembro 2024": {
      month: "Setembro 2024",
      sales: 195000,
      orders: 534,
      customers: 467,
      growth: 3.2,
      topProducts: [
        { name: "Tinta Acrílica Premium", quantity: 198, revenue: 19800 },
        { name: "Furadeira Bosch Professional", quantity: 123, revenue: 36900 },
        { name: "Cimento CPII 50kg", quantity: 312, revenue: 7800 },
        { name: "Vaso Sanitário Completo", quantity: 67, revenue: 12730 }
      ],
      categories: [
        { name: "Tintas e Vernizes", percentage: 32 },
        { name: "Ferramentas", percentage: 30 },
        { name: "Cimentos e Argamassas", percentage: 18 },
        { name: "Material Hidráulico", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Outubro 2024": {
      month: "Outubro 2024",
      sales: 208000,
      orders: 567,
      customers: 489,
      growth: 6.7,
      topProducts: [
        { name: "Furadeira Bosch Professional", quantity: 156, revenue: 46800 },
        { name: "Tinta Acrílica Premium", quantity: 212, revenue: 21200 },
        { name: "Kit Ferramentas 100 Peças", quantity: 89, revenue: 13350 },
        { name: "Material Elétrico", quantity: 178, revenue: 8900 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 33 },
        { name: "Tintas e Vernizes", percentage: 28 },
        { name: "Material Elétrico", percentage: 20 },
        { name: "Pisos e Revestimentos", percentage: 14 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Novembro 2024": {
      month: "Novembro 2024",
      sales: 215000,
      orders: 589,
      customers: 512,
      growth: 3.4,
      topProducts: [
        { name: "Tinta Acrílica Premium", quantity: 223, revenue: 22300 },
        { name: "Furadeira Bosch Professional", quantity: 134, revenue: 40200 },
        { name: "Cimento CPII 50kg", quantity: 345, revenue: 8625 },
        { name: "Material Hidráulico", quantity: 156, revenue: 7800 }
      ],
      categories: [
        { name: "Tintas e Vernizes", percentage: 30 },
        { name: "Ferramentas", percentage: 28 },
        { name: "Cimentos e Argamassas", percentage: 22 },
        { name: "Material Hidráulico", percentage: 15 },
        { name: "Outros", percentage: 5 }
      ]
    },
    "Dezembro 2024": {
      month: "Dezembro 2024",
      sales: 228000,
      orders: 623,
      customers: 545,
      growth: 6.0,
      topProducts: [
        { name: "Furadeira Bosch Professional", quantity: 167, revenue: 50100 },
        { name: "Tinta Acrílica Premium", quantity: 234, revenue: 23400 },
        { name: "Kit Ferramentas 100 Peças", quantity: 98, revenue: 14700 },
        { name: "Material Elétrico", quantity: 189, revenue: 9450 }
      ],
      categories: [
        { name: "Ferramentas", percentage: 35 },
        { name: "Tintas e Vernizes", percentage: 27 },
        { name: "Material Elétrico", percentage: 22 },
        { name: "Pisos e Revestimentos", percentage: 11 },
        { name: "Outros", percentage: 5 }
      ]
    }
  };

  // Função para gerar dados diários simulados com padrão mais realista
  const generateDailyData = (month: string): DailySalesData[] => {
    const daysInMonth = new Date(2024, getMonthNumber(month), 0).getDate();
    const dailyData: DailySalesData[] = [];
    
    // Padrão semanal mais realista
    for (let day = 1; day <= daysInMonth; day++) {
      const baseSales = salesData[month].sales / daysInMonth;
      const dayOfWeek = new Date(2024, getMonthNumber(month), day).getDay();
      
      // Variação baseada no dia da semana
      let weeklyFactor = 1;
      if (dayOfWeek === 0 || dayOfWeek === 6) weeklyFactor = 0.7; // Fins de semana
      else if (dayOfWeek === 1) weeklyFactor = 1.2; // Segunda-feira
      else if (dayOfWeek === 5) weeklyFactor = 1.1; // Sexta-feira
      
      // Variação aleatória menor
      const randomFactor = 1 + (Math.random() - 0.5) * 0.2;
      
      dailyData.push({
        day,
        sales: Math.round(baseSales * weeklyFactor * randomFactor),
        orders: Math.round((salesData[month].orders / daysInMonth) * weeklyFactor * randomFactor),
        customers: Math.round((salesData[month].customers / daysInMonth) * weeklyFactor * randomFactor)
      });
    }
    
    return dailyData;
  };

  // Função auxiliar para obter número do mês
  const getMonthNumber = (monthName: string): number => {
    const months = {
      "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3,
      "Maio": 4, "Junho": 5, "Julho": 6, "Agosto": 7,
      "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
    };
    return months[monthName.split(' ')[0] as keyof typeof months] || 0;
  };

  const months = Object.keys(salesData);
  const currentData = salesData[selectedMonth];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  // Função para lidar com clique no ponto do gráfico
  const handleMonthClick = (month: string) => {
    setSelectedMonthForDaily(month);
    setShowDailyView(true);
  };

  // Função para voltar ao gráfico mensal
  const handleBackToMonthly = () => {
    setShowDailyView(false);
    setSelectedMonthForDaily("");
  };

  // Função para selecionar mês na visualização mensal
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
  };

  // Componente para visualização diária
  const DailySalesView = ({ month, onBack }: { month: string; onBack: () => void }) => {
    const dailyData = generateDailyData(month);
    const maxSales = Math.max(...dailyData.map(d => d.sales));
    const minSales = Math.min(...dailyData.map(d => d.sales));

    return (
      <div className="space-y-6">
        {/* Gráfico de Linha Diário */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Vendas Diárias - {month}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative h-64 bg-white rounded-lg p-4">
              {/* Linhas de Grade */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 25, 50, 75, 100].map((line) => (
                  <div key={line} className="border-t border-gray-200 h-0"></div>
                ))}
              </div>

              {/* Eixo Y - Valores */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pointer-events-none">
                {[maxSales, maxSales * 0.75, maxSales * 0.5, maxSales * 0.25, 0].map((value) => (
                  <div key={value} className="transform -translate-y-1 bg-white px-2">
                    R$ {formatCurrency(value)}
                  </div>
                ))}
              </div>

              {/* Eixo X - Dias */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pointer-events-none">
                {[1, 8, 15, 22, dailyData.length].map((day) => (
                  <div key={day} className="transform translate-x-1/2 bg-white px-1">
                    {day}
                  </div>
                ))}
              </div>

              {/* Área do Gráfico */}
              <div className="absolute inset-0 ml-16 mb-8 mt-4">
                {/* Linha do Gráfico */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Gradiente para a linha */}
                  <defs>
                    <linearGradient id="dailyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                    </linearGradient>
                    <linearGradient id="dailyAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  
                  {/* Área preenchida */}
                  <path
                    d={`M 0 100 ${dailyData.map((data, index) => {
                      const x = (index / (dailyData.length - 1)) * 100;
                      const y = 100 - ((data.sales - minSales) / (maxSales - minSales)) * 100;
                      return `L ${x} ${y}`;
                    }).join(' ')} L 100 100 Z`}
                    fill="url(#dailyAreaGradient)"
                  />
                  
                  {/* Linha principal */}
                  <path
                    d={dailyData.map((data, index) => {
                      const x = (index / (dailyData.length - 1)) * 100;
                      const y = 100 - ((data.sales - minSales) / (maxSales - minSales)) * 100;
                      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    stroke="url(#dailyLineGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Pontos de dados */}
                {dailyData.map((data, index) => {
                  const x = (index / (dailyData.length - 1)) * 100;
                  const y = 100 - ((data.sales - minSales) / (maxSales - minSales)) * 100;
                  
                  return (
                    <div
                      key={data.day}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      {/* Ponto */}
                      <div className="w-2 h-2 bg-blue-600 rounded-full group-hover:scale-200 transition-transform duration-200 border border-white"></div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                        <div className="font-medium">Dia {data.day}</div>
                        <div className="text-blue-300">R$ {formatCurrency(data.sales)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas Diárias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Média Diária</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatCurrency(dailyData.reduce((sum, d) => sum + d.sales, 0) / dailyData.length)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Pedidos</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatNumber(dailyData.reduce((sum, d) => sum + d.orders, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Clientes</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {formatNumber(dailyData.reduce((sum, d) => sum + d.customers, 0))}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Dados Diários */}
        <Card className="border-0 bg-white shadow-sm">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-lg font-medium text-gray-900">Detalhamento Diário - {month}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-3 font-medium text-gray-700 bg-gray-50">Dia</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-700 bg-gray-50">Vendas</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-700 bg-gray-50">Pedidos</th>
                    <th className="text-right py-3 px-3 font-medium text-gray-700 bg-gray-50">Clientes</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyData.map((data) => (
                    <tr key={data.day} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-3 font-medium text-gray-900">Dia {data.day}</td>
                      <td className="py-3 px-3 text-right font-semibold text-blue-600">
                        {formatCurrency(data.sales)}
                      </td>
                      <td className="py-3 px-3 text-right text-gray-700">{data.orders}</td>
                      <td className="py-3 px-3 text-right text-gray-700">{data.customers}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {showDailyView ? `Vendas Diárias - ${selectedMonthForDaily}` : "Relatório de Vendas"}
          </h1>
          <p className="text-gray-500 mt-1">
            {showDailyView ? "Análise detalhada por dia" : "Visão geral das vendas mensais de 2024"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showDailyView && (
            <button
              onClick={handleBackToMonthly}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar aos Meses</span>
            </button>
          )}
          <Badge variant="outline" className="text-sm bg-white border-gray-200 text-gray-600">
            {showDailyView ? selectedMonthForDaily : selectedMonth}
          </Badge>
        </div>
      </div>

      {showDailyView ? (
        // Visualização Diária
        <DailySalesView month={selectedMonthForDaily} onBack={handleBackToMonthly} />
      ) : (
        // Visualização Mensal
        <>
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Vendas Totais</p>
                    <p className="text-xl font-semibold text-gray-900">{formatCurrency(currentData.sales)}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">+{((currentData.sales / 125000 - 1) * 100).toFixed(1)}% vs Jan</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Pedidos</p>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(currentData.orders)}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-12 bg-gray-200 rounded-full h-1">
                        <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(currentData.orders / 489) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{((currentData.orders / 489) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Clientes</p>
                    <p className="text-xl font-semibold text-gray-900">{formatNumber(currentData.customers)}</p>
                    <div className="flex items-center mt-1">
                      <div className="w-12 bg-gray-200 rounded-full h-1">
                        <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${(currentData.customers / 412) * 100}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{((currentData.customers / 412) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentData.growth >= 0 ? 'bg-orange-50' : 'bg-red-50'
                  }`}>
                    {currentData.growth >= 0 ? (
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Crescimento</p>
                    <p className={`text-xl font-semibold ${currentData.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentData.growth >= 0 ? '+' : ''}{currentData.growth.toFixed(1)}%
                    </p>
                    <div className="flex items-center mt-1">
                      <div className={`w-2 h-2 rounded-full mr-2 ${currentData.growth >= 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-500">vs mês anterior</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gráfico de Linha Mensal */}
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Vendas Mensais - 2024
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative h-64 bg-white rounded-lg p-4">
                {/* Linhas de Grade */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 25, 50, 75, 100].map((line) => (
                    <div key={line} className="border-t border-gray-200 h-0"></div>
                  ))}
                </div>

                {/* Eixo Y - Valores */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pointer-events-none">
                  {[250000, 200000, 150000, 100000, 50000, 0].map((value) => (
                    <div key={value} className="transform -translate-y-1 bg-white px-2">
                      R$ {formatCurrency(value)}
                    </div>
                  ))}
                </div>

                {/* Eixo X - Meses */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 pointer-events-none">
                  {months.map((month) => (
                    <div key={month} className="transform translate-x-1/2 bg-white px-1">
                      {month.split(' ')[0]}
                    </div>
                  ))}
                </div>

                {/* Área do Gráfico */}
                <div className="absolute inset-0 ml-16 mb-8 mt-4">
                  {/* Linha do Gráfico */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {/* Gradiente para a linha */}
                    <defs>
                      <linearGradient id="monthlyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Linha principal */}
                    <path
                      d={months.map((month, index) => {
                        const x = (index / (months.length - 1)) * 100;
                        const y = 100 - (salesData[month].sales / 250000) * 100;
                        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      stroke="url(#monthlyLineGradient)"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Pontos de dados */}
                  {months.map((month, index) => {
                    const x = (index / (months.length - 1)) * 100;
                    const y = 100 - (salesData[month].sales / 250000) * 100;
                    const isSelected = month === selectedMonth;
                    
                    return (
                      <div
                        key={month}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      >
                        {/* Ponto */}
                        <div 
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            isSelected 
                              ? 'bg-blue-600 ring-2 ring-blue-200' 
                              : 'bg-blue-600 group-hover:ring-2 group-hover:ring-blue-200'
                          } group-hover:scale-150 border-2 border-white`}
                          onClick={() => handleMonthClick(month)}
                        ></div>
                        
                        {/* Ponto interno para seleção */}
                        <div 
                          className={`absolute inset-1 rounded-full transition-all duration-200 ${
                            isSelected 
                              ? 'bg-blue-600' 
                              : 'bg-blue-600 opacity-0 group-hover:opacity-100'
                          }`}
                          onClick={() => handleMonthSelect(month)}
                        ></div>
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                          <div className="font-medium">{month}</div>
                          <div className="text-blue-300">R$ {formatCurrency(salesData[month].sales)}</div>
                          <div className="text-gray-400 text-xs mt-1">Clique para detalhes</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5 text-center">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Melhor Mês</p>
                <p className="text-lg font-semibold text-gray-900 mb-1">Dezembro</p>
                <p className="text-sm text-green-600 font-medium">R$ 228.000</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5 text-center">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Crescimento</p>
                <p className="text-lg font-semibold text-gray-900 mb-1">+82.4%</p>
                <p className="text-sm text-blue-600 font-medium">Janeiro → Dezembro</p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-sm">
              <CardContent className="p-5 text-center">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-600 mb-1">Média Mensal</p>
                <p className="text-lg font-semibold text-gray-900 mb-1">R$ 175.667</p>
                <p className="text-sm text-purple-600 font-medium">12 meses</p>
              </CardContent>
            </Card>
          </div>

          {/* Produtos Mais Vendidos */}
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Produtos Mais Vendidos - {selectedMonth.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {currentData.topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{formatNumber(product.quantity)} unidades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{formatCurrency(product.revenue)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribuição por Categorias */}
          <Card className="border-0 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="text-lg font-medium text-gray-900">Distribuição por Categorias - {selectedMonth.split(' ')[0]}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {currentData.categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900 w-6 text-right">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default SalesChart;
