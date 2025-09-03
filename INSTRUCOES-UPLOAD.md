# 📋 INSTRUÇÕES PARA UPLOAD NO GITHUB

## 🚀 Método 1: Script Automático (Recomendado)

1. **Abra o PowerShell como Administrador**:
   - Pressione `Win + X`
   - Selecione "Windows PowerShell (Admin)" ou "Terminal (Admin)"

2. **Navegue até a pasta do projeto**:
   ```powershell
   cd "C:\Users\m4yum\Downloads\projeto-coisa 2.0"
   ```

3. **Execute o script**:
   ```powershell
   .\upload-to-github.ps1
   ```

4. **Siga as instruções na tela**:
   - O script instalará o Git automaticamente se necessário
   - Configure seu email do GitHub quando solicitado
   - Faça login no GitHub quando solicitado

## 🔧 Método 2: Manual (Se o script não funcionar)

### Passo 1: Instalar Git
1. Baixe o Git em: https://git-scm.com/download/win
2. Instale com as configurações padrão
3. Reinicie o PowerShell

### Passo 2: Configurar Git
```powershell
git config --global user.name "Theo Hideki"
git config --global user.email "seu-email@github.com"
```

### Passo 3: Inicializar Repositório
```powershell
cd "C:\Users\m4yum\Downloads\projeto-coisa 2.0"
git init
git add .
git commit -m "Initial commit: COISA - E-commerce de Materiais de Construção"
```

### Passo 4: Conectar ao GitHub
```powershell
git remote add origin https://github.com/theohidekii/Coisa.git
git branch -M main
git push -u origin main
```

## 🌐 Método 3: GitHub Desktop (Mais Fácil)

1. **Baixe o GitHub Desktop**: https://desktop.github.com/
2. **Instale e faça login** com sua conta GitHub
3. **Adicione repositório local**:
   - File → Add local repository
   - Navegue até: `C:\Users\m4yum\Downloads\projeto-coisa 2.0`
   - Clique em "Add repository"
4. **Publique no GitHub**:
   - Clique em "Publish repository"
   - Selecione: `theohidekii/Coisa`
   - Clique em "Publish repository"

## 📁 Arquivos que Serão Enviados

✅ **Incluídos**:
- `src/` - Código fonte completo
- `public/` - Arquivos públicos
- `package.json` - Dependências
- `README.md` - Documentação
- `LICENSE` - Licença MIT
- `.gitignore` - Arquivos ignorados

❌ **Ignorados**:
- `node_modules/` - Dependências
- `dist/` - Build de produção
- `upload-to-github.ps1` - Script temporário

## 🔐 Autenticação

Se solicitado, você precisará:
1. **Fazer login no GitHub** no navegador
2. **Autorizar o Git** a acessar sua conta
3. **Gerar um token** se necessário

## ✅ Verificação

Após o upload, verifique:
- https://github.com/theohidekii/Coisa
- Todos os arquivos estão presentes
- O README.md está formatado corretamente

## 🚨 Solução de Problemas

### Erro: "Git não encontrado"
- Execute o script como administrador
- Ou instale o Git manualmente

### Erro: "Authentication failed"
- Verifique suas credenciais do GitHub
- Gere um novo token de acesso pessoal

### Erro: "Repository already exists"
- O repositório já existe, faça um pull primeiro:
  ```powershell
  git pull origin main --allow-unrelated-histories
  ```

## 📞 Suporte

Se tiver problemas:
1. Verifique se o Git está instalado: `git --version`
2. Verifique se está logado no GitHub
3. Tente o método do GitHub Desktop

---
**Boa sorte! 🚀**
