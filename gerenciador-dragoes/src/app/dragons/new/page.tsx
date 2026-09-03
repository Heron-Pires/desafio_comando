// Define que este é um Client Component (executado no navegador)
"use client";

// Hook do Next.js para navegação e redirecionamento de rotas
import { useRouter } from "next/navigation";
// Serviço que realiza chamadas para a API (neste caso, a criação do dragão)
import { dragonService } from "@/services/api";
// Tipagem TypeScript para os dados do formulário de dragão
import { DragonFormData } from "@/types/dragon";
// Componente de cabeçalho da aplicação
import { Header } from "@/components/Header";
// Formulário reutilizável de criação/edição de dragão
import { DragonForm } from "@/components/DragonForm";
// Componentes visuais para estruturar o cartão da página
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewDragonPage() {
    // Instância do roteador para redirecionar o usuário após o cadastro
    const router = useRouter();
    // Função assíncrona que lida com o envio do formulário de criação
    const handleCreate = async (data: DragonFormData) => {
        try {
            // Faz a chamada à API enviando os dados do novo dragão (POST)
            await dragonService.create(data);
            // Em caso de sucesso, redireciona o usuário para a lista de dragões
            router.push("/dragons");
        } catch (err) {
            // Exibe um alerta de erro caso a requisição falhe
            alert("Erro ao cadastrar o dragão.");
        }
    };

    // Renderização do layout e formulário
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="container mx-auto p-4 max-w-lg mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Cadastrar Novo Dragão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DragonForm
                            onSubmit={handleCreate}
                            buttonText="Cadastrar"
                        />
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
