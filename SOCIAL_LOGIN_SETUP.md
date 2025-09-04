# Configuração do Login Social

Este projeto implementa login social com Google e Facebook. Para que funcione corretamente, você precisa configurar as credenciais das APIs.

## Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Google+ 
4. Vá para "Credenciais" e clique em "Criar credenciais" > "ID do cliente OAuth 2.0"
5. Configure as origens JavaScript autorizadas:
   - `http://localhost:5173` (desenvolvimento)
   - `https://seudominio.com` (produção)
6. Copie o Client ID gerado
7. Substitua `YOUR_GOOGLE_CLIENT_ID` no arquivo `src/config/socialAuth.ts`

## Facebook Login

1. Acesse o [Facebook Developers](https://developers.facebook.com/)
2. Crie um novo aplicativo
3. Adicione o produto "Facebook Login"
4. Configure as URLs de redirecionamento OAuth válidas:
   - `http://localhost:5173` (desenvolvimento)
   - `https://seudominio.com` (produção)
5. Copie o App ID gerado
6. Substitua `YOUR_FACEBOOK_APP_ID` no arquivo `src/config/socialAuth.ts`

## Arquivo de Configuração

Edite o arquivo `src/config/socialAuth.ts`:

```typescript
export const GOOGLE_CLIENT_ID = "seu-google-client-id-aqui";
export const FACEBOOK_APP_ID = "seu-facebook-app-id-aqui";
```

## Funcionalidades Implementadas

- ✅ Login com Google (nome e email)
- ✅ Login com Facebook (nome e email)
- ✅ Cadastro em duas etapas
- ✅ Validação de formulários
- ✅ Feedback visual com toasts
- ✅ Integração com contexto de usuário
- ✅ Navegação automática após login

## Dados Coletados

O sistema coleta apenas as informações essenciais:
- **Nome completo** (do Google/Facebook)
- **Email** (do Google/Facebook)
- **Telefone** (valor padrão para contas sociais)
- **CPF** (valor padrão para contas sociais)

## Segurança

- As credenciais das APIs são armazenadas apenas no frontend
- Para produção, considere usar variáveis de ambiente
- O sistema não armazena senhas das contas sociais
- Todos os dados são processados localmente
