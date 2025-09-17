# 🏗️ Coisa - Construction Materials
   
## 📋 Description

Coisa is a modern and responsive e-commerce platform specialized in construction materials. Built with React, TypeScript, and Tailwind CSS, it delivers an intuitive and efficient shopping experience, with a mobile-first approach.

## ✨ Main Features

### 🛍️ Product System
- **Complete Catalog**: Product browsing with category filters
- **Smart Search**: Real-time search with suggestions
- **Product Details Pages**: Full product info with image gallery
- **Review System**: Verified buyers can rate products with stars and comments
- **Offers Page**: Special deals and promotions
- **Favorites**: Integrated wishlist system

### 🛒 Advanced Shopping Cart
- **Item Management**: Add, remove, and update quantities
- **Visual Counter**: Notification with the number of items in the cart
- **Local Persistence**: Data stored even when logged out
- **Sync**: Cart automatically synchronizes upon login
- **Integrated Favorites**: Unified cart and wishlist system

### 🚚 Optimized Delivery System
- **Smart Shipping Calculation**: Base fee + distance + weight
- **ViaCEP Integration**: Automatic address lookup
- **Expanded Coverage**: Delivery area check (8km radius)
- **Free Shipping**: For purchases above R$ 150.00
- **Store Zip Code**: 09130-410 (Santo André)
- **Distance Calculation**: Haversine formula for precision

### 👤 Complete User System
- **Sign Up and Login**: Full authentication
- **User Profile**: Personal data and multiple addresses
- **Address Management**: Add, edit, and delete addresses
- **Order History**: Track all past purchases
- **Sync**: Cart and wishlist data synchronized when logging in

### 💳 Checkout and Payment
- **Complete Flow**: Personal info → Address → Payment
- **Multiple Methods**: Credit card, PIX, Boleto
- **Validation**: Required fields verification
- **Saved Addresses**: Quick selection of stored addresses

### 🔧 Services and Support
- **Technical Assistance**: Dedicated page with complete information
- **Delivery Info**: Own fleet, postal services, or pickup
- **After-Sales**: Full post-purchase support
- **Online Quotes**: WhatsApp integration for custom quotes
- **FAQ**: Frequently asked questions organized by category

### 📄 Legal Compliance
- **LGPD**: Privacy Policy compliant with Brazilian General Data Protection Law
- **Terms of Use**: Clear and transparent conditions
- **CPF**: Collected only during account creation

### 🏢 Company Information
- **About Us**: Company history, values, and products
- **Business Hours**: Including holidays (same as Saturday hours)
- **Location**: Av. Dom Pedro I, 2275, Vila Vitória, Santo André - SP

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Context API (CartContext, UserContext)
- **Build**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier
- **External APIs**: ViaCEP for address lookup

## 📦 Project Structure


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

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Clone o repositório
git clone https://github.com/theohidekii/Coisa.git
cd Coisa

# Installation dependencies
npm install

# Run the project
npm run dev
```

### Available Scripts
```bash
npm run dev          # Executa em modo desenvolvimento
npm run build        # Gera build de produção
npm run preview      # Preview do build
npm run lint         # Executa o linter
```

## 📱 Mobile-First and Responsiveness

The project was designed with a strong mobile-first approach:

### 🎯 Mobile Optimizations
- **Mobile-First Design**: All components optimized for small screens
- **Integrated Mobile Menu**: Hamburger menu with main functionalities
- **Simplified Navigation**: Removed bottom navigation in favor of side menu
- **Responsive Grids**: Layouts adapt to different screen sizes
- **Touch-Friendly**: Buttons and elements optimized for touch
- **Performance**: Optimized loading for mobile devices
- **Account Access**: Dedicated mobile menu for "My Account" and "My Orders"

### 📱 Supported Devices
- 📱 Smartphones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1440px+)

## 🎨 Design System

- **Colors**: Professional blue palette with variations
- **Typography**: Responsive hierarchical system
- **Components**: Consistent and reusable (Shadcn/ui)
- **Animations**: Smooth transitions and visual feedback
- **Icons**: Lucide React for consistency

## 🔒 Security and Privacy

- **Validation**: Input validation in all forms
- **Sanitization**: XSS protection
- **LGPD**: Compliance with Brazilian data law
- **HTTPS**: Secure communication (production)
- **Local Storage**: Cart data persisted locally

## 📈 Performance and Optimization

- **Lazy Loading**: On-demand component loading
- **Image Optimization**: Responsive and optimized images
- **Caching**: Implemented caching strategies
- **Bundle Splitting**: Split code for better performance
- **Mobile Optimization**: Extra focus on mobile speed

## 🔄 Advanced Features

### Review System
- **Purchase Verification**: Only verified buyers can review
- **Star Rating**: 1–5 star system
- **Comments**: Optional text reviews
- **Persistence**: Reviews stored and displayed

### Address Management
- **Multiple Addresses**: Users can store several addresses
- **Main Address**: Mark primary address
- **Automatic Lookup**: ViaCEP integration
- **Validation**: Required fields checked

### Data Sync
- **Offline Cart**: Works without login
- **Automatic Sync**: Data synchronized on login
- **Persistence**: Data saved between sessions
- **Favorites**: Integrated with cart system

### Mobile Navigation
- **Integrated Menu**: Hamburger menu with main features
- **Account Access**: Dedicated section for "My Account" and "My Orders"
- **Simplified Navigation**: Bottom navigation removed
- **Legal Pages**: FAQ, Terms, Privacy Policy in footer

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

- **Developer**: Theo Hideki
- **GitHub**: [@theohidekii](https://github.com/theohidekii)
- **Project**: [Coisa](https://github.com/theohidekii/Coisa)

---

⭐ If this project helped you, consider giving it a star on GitHub!
