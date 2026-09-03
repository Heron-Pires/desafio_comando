// Define que este arquivo é um Client Component (executado no navegador)
"use client";

// Hook do React para gerenciamento de estados locais
import { useState } from "react";
// Hook do Next.js para controle e navegação entre rotas
import { useRouter } from "next/navigation";
// Serviço responsável por verificar e autenticar as credenciais do usuário
import { authService } from "@/services/auth";
// Componentes de interface (UI) reutilizáveis
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export default function LoginPage() {
    // Instância do roteador para redirecionar o usuário após a autenticação
    const router = useRouter();
    // Estado para armazenar o valor digitado no campo de e-mail
    const [email, setEmail] = useState("");
    // Estado para armazenar o valor digitado no campo de senha
    const [password, setPassword] = useState("");
    // Estado para gerenciar mensagens de erro de validação/login
    const [error, setError] = useState("");

    // Função que gerencia o envio do formulário de login
    const handleSubmit = (e: React.FormEvent) => {
        // Previne o comportamento padrão do navegador de recarregar a página ao enviar o formulário
        e.preventDefault();
        // Limpa eventuais mensagens de erro anteriores
        setError("");

        // Executa a tentativa de login utilizando o serviço de autenticação
        const success = authService.login(email, password);

        if (success) {
            // Redireciona para a lista de dragões após o login
            router.push("/dragons");
        } else {
            // Define a mensagem de erro se a verificação de e-mail ou senha falhar
            setError("E-mail ou senha inválidos. Use admin@email.com / 123456");
        }
    };

    // Renderização da interface e do formulário
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        Gerenciador de Dragões
                    </CardTitle>
                    <CardDescription className="text-center">
                        Faça login para acessar o sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="123456"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
