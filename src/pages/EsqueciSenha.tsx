import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const EsqueciSenha = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validação básica
      if (!email) {
        throw new Error('Por favor, insira seu e-mail');
      }

      // Simular envio de e-mail
      await new Promise(resolve => setTimeout(resolve, 2000));

      setEmailSent(true);
      toast({
        title: "E-mail enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: error instanceof Error ? error.message : "Tente novamente",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Header />
        <div className="flex items-center justify-center p-4 pt-8">
          <div className="w-full max-w-md">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  E-mail enviado!
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Verifique sua caixa de entrada para redefinir sua senha
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Enviamos um link de redefinição de senha para:
                  </p>
                  <p className="font-medium text-gray-900">{email}</p>
                  <p className="text-sm text-gray-600">
                    Se não receber o e-mail em alguns minutos, verifique sua pasta de spam.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => setEmailSent(false)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Tentar outro e-mail
                  </Button>
                  
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      className="w-full"
                    >
                      Voltar ao login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
                Esqueceu sua senha?
              </CardTitle>
              <CardDescription className="text-gray-600">
                Digite seu e-mail e enviaremos um link para redefinir sua senha
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar link de redefinição'}
                </Button>
              </form>

              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-sm text-blue-600 hover:text-blue-800 underline flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
