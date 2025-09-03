# Script para fazer upload do projeto COISA para o GitHub
# Execute este script no PowerShell como administrador

Write-Host "🚀 Iniciando upload do projeto COISA para o GitHub..." -ForegroundColor Green

# Verificar se o Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git não encontrado. Instalando Git..." -ForegroundColor Red
    
    # Instalar Git via winget (Windows Package Manager)
    try {
        winget install --id Git.Git -e --source winget
        Write-Host "✅ Git instalado com sucesso!" -ForegroundColor Green
        Write-Host "🔄 Reinicie o PowerShell e execute este script novamente." -ForegroundColor Yellow
        exit
    } catch {
        Write-Host "❌ Falha ao instalar Git. Instale manualmente em: https://git-scm.com/" -ForegroundColor Red
        exit
    }
}

# Configurar Git (se necessário)
Write-Host "🔧 Configurando Git..." -ForegroundColor Yellow
git config --global user.name "Theo Hideki"
git config --global user.email "seu-email@exemplo.com"

# Inicializar repositório Git
Write-Host "📁 Inicializando repositório Git..." -ForegroundColor Yellow
git init

# Adicionar todos os arquivos
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Yellow
git add .

# Fazer o primeiro commit
Write-Host "💾 Fazendo commit inicial..." -ForegroundColor Yellow
git commit -m "Initial commit: COISA - E-commerce de Materiais de Construção

- Sistema completo de e-commerce
- Cálculo de frete integrado
- Sistema de busca inteligente
- Carrinho de compras
- Checkout completo
- Assistência técnica
- Design responsivo"

# Adicionar repositório remoto
Write-Host "🔗 Conectando ao GitHub..." -ForegroundColor Yellow
git remote add origin https://github.com/theohidekii/Coisa.git

# Renomear branch para main
git branch -M main

# Fazer push para o GitHub
Write-Host "⬆️ Enviando para o GitHub..." -ForegroundColor Yellow
git push -u origin main

Write-Host "✅ Upload concluído com sucesso!" -ForegroundColor Green
Write-Host "🌐 Acesse: https://github.com/theohidekii/Coisa" -ForegroundColor Cyan

# Aguardar entrada do usuário
Read-Host "Pressione Enter para sair"
