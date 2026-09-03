// Define que este arquivo é um Client Component (executado no navegador)
"use client";

// Hook do Next.js para navegação e redirecionamento de rotas
import { useRouter } from "next/navigation";
// Serviço responsável pelas ações de autenticação (ex: encerramento de sessão)
import { authService } from "@/services/auth";
// Componente de botão reutilizável da interface
import { Button } from "@/components/ui/button";

export function Header() {
    // Instância do roteador para redirecionar o usuário após o logout
    const router = useRouter();

    // Função executada ao clicar no botão 'Sair'
    const handleLogout = () => {
        authService.logout(); // Limpa as informações de sessão do usuário
        router.push("/login"); // Redireciona de volta para a tela de login
    };

    // Renderização do layout do cabeçalho
    return (
        <header className="border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <h1 className="text-xl font-bold text-slate-800">
                    🐉 Gerenciador de Dragões
                </h1>
                <Button variant="outline" onClick={handleLogout}>
                    Sair
                </Button>
            </div>
        </header>
    );
}
