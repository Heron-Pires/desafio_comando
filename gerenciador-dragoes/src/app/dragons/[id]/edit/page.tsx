// Define que este arquivo é um Client Component no Next.js (roda no navegador)
"use client";

// Hooks do React para gerenciar estado, efeitos colaterais e desempacotar Promises
import { useEffect, useState, use } from "react";
// Hook do Next.js para redirecionar o usuário entre páginas
import { useRouter } from "next/navigation";
// Serviço que contém as chamadas de API (GET, PUT, etc.)
import { dragonService } from "@/services/api";
// Tipagens TypeScript do dragão e do formulário
import { Dragon, DragonFormData } from "@/types/dragon";
// Componentes visuais reutilizáveis
import { Header } from "@/components/Header";
import { DragonForm } from "@/components/DragonForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EditDragonPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // Instância do roteador para navegação programática
    const router = useRouter();
    // Obtém o 'id' dos parâmetros da URL desempacotando a Promise recebida
    const { id } = use(params);
    // Estado para guardar os dados do dragão recebidos da API
    const [dragon, setDragon] = useState<Dragon | null>(null);
    // Estado para controlar a exibição da tela de carregamento
    const [loading, setLoading] = useState(true);

    // Busca as informações do dragão na API assim que o 'id' é resolvido
    useEffect(() => {
        dragonService
            .getById(id)
            .then(setDragon) // Se tiver sucesso, salva os dados no estado 'dragon'
            .catch(() => alert("Erro ao carregar dados do dragão.")) // Caso falhe, exibe alerta
            .finally(() => setLoading(false)); // Ao finalizar (sucesso ou erro), remove a tela de carregamento
    }, [id]);

    // Envia os novos dados editados para a API
    const handleUpdate = async (data: DragonFormData) => {
        try {
            await dragonService.update(id, data); // Faz a requisição PUT/PATCH para atualizar
            router.push("/dragons"); // Redireciona o usuário de volta para a lista de dragões
        } catch (err) {
            alert("Erro ao atualizar o dragão."); // Alerta caso ocorra erro na requisição
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <p className="text-center mt-10 text-slate-500">
                    Carregando dados...
                </p>
            </div>
        );
    }

    // Renderiza a página de edição assim que os dados estiverem carregados
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />
            <main className="container mx-auto p-4 max-w-lg mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Editar Dragão</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {dragon && (
                            <DragonForm
                                initialValues={{
                                    name: dragon.name,
                                    type: dragon.type,
                                }}
                                onSubmit={handleUpdate}
                                buttonText="Atualizar"
                            />
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
