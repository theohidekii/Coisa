import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Phone, CreditCard, ArrowLeft, ArrowRight } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';
import { useSocialAuth } from '@/hooks/useSocialAuth';
import { SocialButtons } from '@/components/SocialButtons';
import Header from '@/components/Header';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const { toast } = useToast();
  const { isLoading: socialLoading, handleGoogleLogin, handleFacebookLogin, handleSocialError } = useSocialAuth();

  // Estados para login
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Estados para cadastro
  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simular validação de login
      if (!loginData.email || !loginData.password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular dados do usuário logado
      const mockUserData = {
        id: "1",
        nome: "João Silva",
        email: loginData.email,
        telefone: "(11) 99999-9999",
        cpf: "123.456.789-00",
        addresses: [
          {
            id: "1",
            name: "Casa",
            cep: "09130-410",
            logradouro: "Av. Dom Pedro I",
            numero: "2275",
            complemento: "Apto 101",
            bairro: "Vila Vitória",
            localidade: "Santo André",
            uf: "SP",
            isDefault: true
          }
        ]
      };

      setUserData(mockUserData);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro no login",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações da primeira etapa
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    setRegisterStep(2);
  };

  const handleRegisterStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validações da segunda etapa
      if (!registerData.nome || !registerData.telefone || !registerData.cpf) {
        throw new Error('Por favor, preencha todos os campos');
      }

      // Validar CPF (formato básico)
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(registerData.cpf)) {
        throw new Error('CPF deve estar no formato 000.000.000-00');
      }

      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simular dados do usuário cadastrado
      const mockUserData = {
        id: Date.now().toString(),
        nome: registerData.nome,
        email: registerData.email,
        telefone: registerData.telefone,
        cpf: registerData.cpf,
        addresses: []
      };

      setUserData(mockUserData);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à Coisa!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const resetRegisterForm = () => {
    setRegisterData({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      password: '',
      confirmPassword: ''
    });
    setRegisterStep(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <div className="flex items-center justify-center p-4 pt-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="/logo.png" 
                  alt="Coisa" 
                  className="h-16 w-auto"
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {isLogin ? 'Entrar na sua conta' : 'Criar nova conta'}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {isLogin 
                  ? 'Acesse sua conta para continuar comprando' 
                  : 'Cadastre-se para aproveitar todos os benefícios'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => {
                setIsLogin(value === "login");
                resetRegisterForm();
              }}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Cadastrar</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="seu@email.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-600 hover:bg-blue-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou continue com</span>
                    </div>
                  </div>

                  <SocialButtons
                    onGoogleSuccess={handleGoogleLogin}
                    onFacebookSuccess={handleFacebookLogin}
                    onError={handleSocialError}
                    isLoading={socialLoading}
                  />

                  <div className="text-center">
                    <Link 
                      to="/esqueci-senha" 
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  {registerStep === 1 ? (
                    <form onSubmit={handleRegisterStep1} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-email">E-mail</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="seu@email.com"
                            value={registerData.email}
                            onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Mínimo 6 caracteres"
                            value={registerData.password}
                            onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">Confirmar senha</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-confirm-password"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirme sua senha"
                            value={registerData.confirmPassword}
                            onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                            className="pl-10 pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        Próximo
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegisterStep2} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-nome">Nome completo</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-nome"
                            type="text"
                            placeholder="Seu nome completo"
                            value={registerData.nome}
                            onChange={(e) => setRegisterData({...registerData, nome: e.target.value})}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-telefone">Telefone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-telefone"
                            type="tel"
                            placeholder="(11) 99999-9999"
                            value={registerData.telefone}
                            onChange={(e) => setRegisterData({...registerData, telefone: formatPhone(e.target.value)})}
                            className="pl-10"
                            maxLength={15}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-cpf">CPF</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="register-cpf"
                            type="text"
                            placeholder="000.000.000-00"
                            value={registerData.cpf}
                            onChange={(e) => setRegisterData({...registerData, cpf: formatCPF(e.target.value)})}
                            className="pl-10"
                            maxLength={14}
                            required
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => setRegisterStep(1)}
                          className="flex-1"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Voltar
                        </Button>
                        
                        <Button 
                          type="submit" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                        </Button>
                      </div>
                    </form>
                  )}

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-500">Ou cadastre-se com</span>
                    </div>
                  </div>

                  <SocialButtons
                    onGoogleSuccess={handleGoogleLogin}
                    onFacebookSuccess={handleFacebookLogin}
                    onError={handleSocialError}
                    isLoading={socialLoading}
                  />
                </TabsContent>
              </Tabs>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Ao continuar, você concorda com nossos{' '}
                  <Link to="/termos-de-uso" className="text-blue-600 hover:text-blue-800 underline">
                    Termos de Uso
                  </Link>{' '}
                  e{' '}
                  <Link to="/politica-privacidade" className="text-blue-600 hover:text-blue-800 underline">
                    Política de Privacidade
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
