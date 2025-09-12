# 🏗️ Coisa - Materiais de Construção
   
## 📋 Descrição

Coisa é uma plataforma de e-commerce moderna e responsiva especializada em materiais de construção. Desenvolvida com React, TypeScript e Tailwind CSS, oferece uma experiência de compra intuitiva e eficiente, com foco total na experiência mobile.

## ✨ Funcionalidades Principais

### 🛍️ Sistema de Produtos
- **Catálogo Completo**: Visualização de produtos com filtros por categoria
- **Busca Inteligente**: Sistema de busca com sugestões em tempo real
- **Páginas de Detalhes**: Informações completas dos produtos com galeria de imagens
- **Sistema de Avaliações**: Usuários que compraram podem avaliar produtos com estrelas e comentários
- **Página de Ofertas**: Produtos em promoção com preços especiais
- **Favoritos**: Sistema de lista de desejos integrado

### 🛒 Carrinho de Compras Avançado
- **Gestão de Itens**: Adicionar, remover e alterar quantidades
- **Contador Visual**: Notificação com número de itens no carrinho
- **Persistência Local**: Dados mantidos mesmo quando deslogado
- **Sincronização**: Carrinho sincroniza automaticamente ao fazer login
- **Favoritos Integrados**: Sistema unificado de carrinho e favoritos

### 🚚 Sistema de Entrega Otimizado
- **Cálculo de Frete Inteligente**: Taxa base + distância + peso
- **Integração ViaCEP**: Busca automática de endereços
- **Cobertura Expandida**: Verificação de área de entrega (8km)
- **Frete Grátis**: Para compras acima de R$ 150,00
- **CEP da Loja**: 09130-410 (Santo André)
- **Cálculo de Distância**: Fórmula de Haversine para precisão

### 👤 Sistema de Usuários Completo
- **Cadastro e Login**: Autenticação completa
- **Perfil do Usuário**: Dados pessoais e múltiplos endereços
- **Gerenciamento de Endereços**: Adicionar, editar e remover endereços
- **Histórico**: Acompanhamento de pedidos
- **Sincronização**: Dados do carrinho/favoritos sincronizam ao logar

### 💳 Checkout e Pagamento
- **Fluxo Completo**: Informações pessoais → Endereço → Pagamento
- **Múltiplas Formas**: Cartão de crédito, PIX, Boleto
- **Validação**: Verificação de dados obrigatórios
- **Endereços Salvos**: Seleção rápida de endereços cadastrados

### 🔧 Serviços e Suporte
- **Assistência Técnica**: Página dedicada com informações completas
- **Entrega**: Detalhes sobre métodos de entrega (própria, correios, retirada)
- **Pós-venda**: Suporte completo após a compra
- **Orçamento Online**: Integração com WhatsApp para orçamentos
- **FAQ**: Perguntas frequentes organizadas por categoria

### 📄 Conformidade Legal
- **LGPD**: Política de Privacidade em conformidade com a Lei Geral de Proteção de Dados
- **Termos de Uso**: Termos e condições claros e transparentes
- **CPF**: Coleta apenas durante criação de conta

### 🏢 Informações da Empresa
- **Sobre Nós**: História, valores e produtos da empresa
- **Horário de Funcionamento**: Incluindo feriados (mesmo horário dos sábados)
- **Localização**: Av. Dom Pedro I, 2275, Vila Vitória, Santo André - SP

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS + Shadcn/ui
- **Roteamento**: React Router DOM
- **Estado**: React Context API (CartContext, UserContext)
- **Build**: Vite
- **Linting**: ESLint
- **Formatação**: Prettier
- **APIs Externas**: ViaCEP para busca de endereços

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI base (Shadcn/ui)
│   ├── Header.tsx      # Cabeçalho responsivo com menu mobile integrado
│   ├── Footer.tsx      # Rodapé otimizado para mobile
│   ├── BannerCarousel.tsx # Carrossel de banners responsivo
│   ├── Categories.tsx  # Categorias de produtos
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Produtos.tsx    # Listagem de produtos responsiva
│   ├── ProdutoDetalhe.tsx # Detalhes do produto com avaliações
│   ├── Carrinho.tsx    # Carrinho de compras otimizado
│   ├── Checkout.tsx    # Finalização de compra
│   ├── MinhaConta.tsx  # Gerenciamento de conta e endereços
│   ├── WishlistPage.tsx # Lista de favoritos
│   ├── Ofertas.tsx     # Página de produtos em oferta
│   ├── Assistencia.tsx # Assistência técnica
│   ├── Entrega.tsx     # Informações de entrega
│   ├── PosVenda.tsx    # Pós-venda
│   ├── SobreNos.tsx    # Sobre a empresa
│   ├── FAQ.tsx         # Perguntas frequentes
│   ├── TermosDeUso.tsx # Termos de uso
│   ├── PoliticaPrivacidade.tsx # Política de privacidade LGPD
│   └── ...
├── context/            # Contextos do React
│   ├── CartContext.tsx # Gerenciamento unificado de carrinho e favoritos
│   └── UserContext.tsx # Dados do usuário e endereços
├── hooks/              # Hooks customizados
│   ├── useProductReviews.ts # Sistema de avaliações
│   ├── useGlobalProductReviews.ts # Gerenciamento global de reviews
│   ├── useUser.ts      # Dados do usuário
│   └── useCart.ts      # Carrinho e favoritos
└── utils/              # Utilitários
    ├── distance.ts     # Cálculo de distância (Haversine)
    └── ...
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/theohidekii/Coisa.git
cd Coisa

# Instale as dependências
npm install

# Execute o projeto
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build
npm run lint         # Executa o linter
```

## 📱 Responsividade e Mobile-First

O projeto foi desenvolvido com foco total na experiência mobile:

### 🎯 Otimizações Mobile Implementadas
- **Design Mobile-First**: Todos os componentes otimizados para mobile
- **Menu Mobile Integrado**: Menu hambúrguer no header com todas as funcionalidades principais
- **Navegação Simplificada**: Remoção da navegação inferior, foco no menu lateral
- **Grids Responsivos**: Layouts que se adaptam a diferentes telas
- **Touch-Friendly**: Botões e elementos otimizados para toque
- **Performance**: Carregamento otimizado para dispositivos móveis
- **Acesso à Conta**: Menu mobile dedicado para "Minha Conta" e "Meus Pedidos"

### 📱 Dispositivos Suportados
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Telas grandes (1440px+)

## 🎨 Design System

- **Cores**: Paleta azul profissional com variações
- **Tipografia**: Sistema hierárquico responsivo
- **Componentes**: Reutilizáveis e consistentes (Shadcn/ui)
- **Animações**: Transições suaves e feedback visual
- **Ícones**: Lucide React para consistência

## 🔒 Segurança e Privacidade

- **Validação**: Dados de entrada validados em todos os formulários
- **Sanitização**: Prevenção contra XSS
- **LGPD**: Conformidade com a Lei Geral de Proteção de Dados
- **HTTPS**: Comunicação segura (em produção)
- **Local Storage**: Dados do carrinho persistidos localmente

## 📈 Performance e Otimização

- **Lazy Loading**: Carregamento sob demanda de componentes
- **Otimização de Imagens**: Imagens responsivas e otimizadas
- **Caching**: Estratégias de cache implementadas
- **Bundle Splitting**: Código dividido para melhor performance
- **Mobile Optimization**: Foco especial na performance mobile

## 🔄 Funcionalidades Avançadas

### Sistema de Avaliações
- **Verificação de Compra**: Apenas compradores podem avaliar
- **Avaliação por Estrelas**: Sistema de 1-5 estrelas
- **Comentários**: Texto opcional com avaliação
- **Persistência**: Avaliações salvas e exibidas

### Gerenciamento de Endereços
- **Múltiplos Endereços**: Usuários podem cadastrar vários endereços
- **Endereço Principal**: Marcação de endereço principal
- **Busca Automática**: Integração com ViaCEP
- **Validação**: Verificação de dados obrigatórios

### Sincronização de Dados
- **Carrinho Offline**: Funciona mesmo sem login
- **Sincronização Automática**: Dados sincronizam ao fazer login
- **Persistência**: Dados mantidos entre sessões
- **Favoritos**: Sistema integrado com carrinho

### Navegação Mobile Otimizada
- **Menu Integrado**: Menu hambúrguer no header com funcionalidades principais
- **Acesso à Conta**: Seção dedicada para "Minha Conta" e "Meus Pedidos"
- **Navegação Simplificada**: Remoção da navegação inferior
- **Páginas Legais**: FAQ, Termos de Uso e Política de Privacidade no footer

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Contato

- **Desenvolvedor**: Theo Hideki
- **GitHub**: [@theohidekii](https://github.com/theohidekii)
- **Projeto**: [Coisa](https://github.com/theohidekii/Coisa)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
