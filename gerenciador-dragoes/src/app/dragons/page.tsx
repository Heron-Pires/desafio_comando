// Define que este arquivo é um Client Component (executado no navegador)
"use client";

// Hooks do React para gerenciar estado e ciclo de vida do componente
import { useEffect, useState } from "react";
// Componente do Next.js para navegação entre páginas sem recarregar a tela
import Link from "next/link";
// Tipagem TypeScript referente à estrutura de um dragão
import { Dragon } from "@/types/dragon";
// Serviço responsável pela comunicação com a API (operações HTTP)
import { dragonService } from "@/services/api";
// Componente do cabeçalho
import { Header } from "@/components/Header";
// Componente de cartão visual para exibir as informações de cada dragão
import { DragonCard } from "@/components/DragonCard";
// Componente reutilizável de botão
import { Button } from "@/components/ui/button";

export default function DragonsListPage() {
    // Estado para armazenar a lista de dragões retornada pela API
    const [dragons, setDragons] = useState<Dragon[]>([]);
    // Estado para indicar se os dados ainda estão sendo carregados
    const [loading, setLoading] = useState(true);
    // Estado para armazenar mensagens de erro, caso ocorram
    const [error, setError] = useState("");

    // Função assíncrona responsável por buscar todos os dragões na API
    const loadDragons = async () => {
        try {
            setLoading(true); // Ativa o estado de carregamento
            const data = await dragonService.getAll(); // Faz a chamada HTTP GET
            setDragons(data); // Salva o array de dragões recebido no estado
        } catch (err) {
            setError("Erro ao carregar a lista de dragões."); // Captura erros e exibe mensagem
        } finally {
            setLoading(false); // Desativa o carregamento ao terminar (sucesso ou falha)
        }
    };
    // Executa a busca de dragões uma única vez assim que o componente é montado na tela
    useEffect(() => {
        loadDragons();
    }, []);

    // Função responsável por excluir um dragão específico pelo seu ID
    const handleDelete = async (id: string) => {
        // Solicita confirmação do usuário antes de prosseguir com a exclusão
        if (confirm("Tem certeza que deseja remover este dragão?")) {
            try {
                await dragonService.delete(id); // Faz a requisição DELETE na API
                // Atualiza a lista removendo o item deletado
                setDragons((prev) => prev.filter((d) => d.id !== id));
            } catch (err) {
                alert("Erro ao deletar o dragão."); // Exibe alerta caso aconteça algum erro
            }
        }
    };

    // Renderização do layout e lista
    return (
        <div className="min-h-screen bg-slate-50">
            <Header />

            <main className="container mx-auto p-4 md:p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">
                        Lista de Dragões
                    </h2>
                    <Link href="/dragons/new">
                        <Button>Cadastrar Dragão</Button>
                    </Link>
                </div>

                {loading && (
                    <div className="text-center py-10 text-slate-500">
                        Carregando dragões...
                    </div>
                )}

                {error && (
                    <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
                        {error}
                    </div>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dragons.map((dragon) => (
                            <DragonCard
                                key={dragon.id}
                                dragon={dragon}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
