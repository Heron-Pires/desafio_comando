// Define que este arquivo é um Client Component (executado no navegador)
"use client";

// Componente do Next.js para navegação rápida entre páginas
import Link from "next/link";
// Componentes visuais para construção do cartão
import { Dragon } from "@/types/dragon";
// Componentes visuais para construção do cartão
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// Componente de botão reutilizável
import { Button } from "@/components/ui/button";

// Definição das propriedades (props) que o componente DragonCard recebe
interface DragonCardProps {
    dragon: Dragon; // Objeto com os dados do dragão a ser exibido
    onDelete: (id: string) => void; // Função de callback disparada ao clicar para remover o dragão
}

// Renderização do cartão
export function DragonCard({ dragon, onDelete }: DragonCardProps) {
    return (
        <Card className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
                <CardTitle className="text-lg capitalize">
                    {dragon.name}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-slate-600">
                    <span className="font-semibold">Tipo:</span> {dragon.type}
                </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 border-t pt-4">
                <div className="flex gap-2">
                    <Link href={`/dragons/${dragon.id}`}>
                        <Button variant="outline" size="sm">
                            Detalhes
                        </Button>
                    </Link>
                    <Link href={`/dragons/${dragon.id}/edit`}>
                        <Button variant="secondary" size="sm">
                            Editar
                        </Button>
                    </Link>
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(dragon.id)}
                >
                    Deletar
                </Button>
            </CardFooter>
        </Card>
    );
}
