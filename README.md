# 🏗️ COISA - Materiais de Construção

## 📋 Descrição

COISA é uma plataforma de e-commerce moderna e responsiva especializada em materiais de construção. Desenvolvida com React, TypeScript e Tailwind CSS, oferece uma experiência de compra intuitiva e eficiente.

## ✨ Funcionalidades Principais

### 🛍️ Sistema de Produtos
- **Catálogo Completo**: Visualização de produtos com filtros por categoria
- **Busca Inteligente**: Sistema de busca com sugestões em tempo real
- **Páginas de Detalhes**: Informações completas dos produtos com galeria de imagens
- **Avaliações**: Sistema de avaliação com estrelas

### 🛒 Carrinho de Compras
- **Gestão de Itens**: Adicionar, remover e alterar quantidades
- **Contador Visual**: Notificação com número de itens no carrinho
- **Persistência**: Dados mantidos durante a sessão

### 🚚 Cálculo de Frete
- **Sistema Híbrido**: Taxa base + distância + peso
- **Integração ViaCEP**: Busca automática de endereços
- **Cobertura**: Verificação de área de entrega
- **Frete Grátis**: Para compras acima de R$ 150,00

### 👤 Sistema de Usuários
- **Cadastro e Login**: Autenticação completa
- **Perfil do Usuário**: Dados pessoais e endereços salvos
- **Histórico**: Acompanhamento de pedidos

### 💳 Checkout e Pagamento
- **Fluxo Completo**: Informações pessoais → Endereço → Pagamento
- **Múltiplas Formas**: Cartão de crédito, PIX, Boleto
- **Validação**: Verificação de dados obrigatórios

### 🔧 Assistência Técnica
- **Página Dedicada**: Informações sobre serviços técnicos
- **Contato Direto**: Integração com WhatsApp
- **Cobertura**: Áreas atendidas

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS + Shadcn/ui
- **Roteamento**: React Router DOM
- **Estado**: React Context API
- **Build**: Vite
- **Linting**: ESLint
- **Formatação**: Prettier

## 📦 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de UI base
│   ├── Header.tsx      # Cabeçalho da aplicação
│   ├── Footer.tsx      # Rodapé da aplicação
│   ├── SearchBox.tsx   # Sistema de busca
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Produtos.tsx    # Listagem de produtos
│   ├── ProdutoDetalhe.tsx # Detalhes do produto
│   ├── Carrinho.tsx    # Carrinho de compras
│   ├── Checkout.tsx    # Finalização de compra
│   └── ...
├── context/            # Contextos do React
│   ├── CartContext.tsx # Gerenciamento do carrinho
│   └── UserContext.tsx # Dados do usuário
└── utils/              # Utilitários
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

## 📱 Responsividade

O projeto é totalmente responsivo e funciona perfeitamente em:
- 📱 Dispositivos móveis
- 📱 Tablets
- 💻 Desktops
- 🖥️ Telas grandes

## 🎨 Design System

- **Cores**: Paleta azul profissional
- **Tipografia**: Sistema hierárquico claro
- **Componentes**: Reutilizáveis e consistentes
- **Animações**: Transições suaves e feedback visual

## 🔒 Segurança

- **Validação**: Dados de entrada validados
- **Sanitização**: Prevenção contra XSS
- **HTTPS**: Comunicação segura (em produção)

## 📈 Performance

- **Lazy Loading**: Carregamento sob demanda
- **Otimização**: Imagens e assets otimizados
- **Caching**: Estratégias de cache implementadas

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
- **Projeto**: [COISA](https://github.com/theohidekii/Coisa)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
