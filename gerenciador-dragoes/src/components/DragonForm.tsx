// Define que este é um Client Component (executado no navegador)
"use client";

// Hook do React para gerenciar os estados do formulário
import { useState } from "react";
// Tipagem TypeScript com a estrutura dos dados do formulário
import { DragonFormData } from "@/types/dragon";
// Componentes de interface reutilizáveis
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define as propriedades (props) aceitas pelo componente DragonForm
interface DragonFormProps {
    initialValues?: DragonFormData; // Valores iniciais opcionais (usados ao editar)
    onSubmit: (data: DragonFormData) => Promise<void>; // Função disparada no envio do formulário
    buttonText: string; // Texto customizado para o botão de envio (ex: "Cadastrar" ou "Atualizar")
}

export function DragonForm({
    initialValues,
    onSubmit,
    buttonText,
}: DragonFormProps) {
    // Estado do campo 'Nome', pré-preenchido se existirem 'initialValues'
    const [name, setName] = useState(initialValues?.name || "");
    // Estado do campo 'Tipo', pré-preenchido se existirem 'initialValues'
    const [type, setType] = useState(initialValues?.type || "");
    // Estado para controlar o bloqueio do botão durante o envio (loading state)
    const [submitting, setSubmitting] = useState(false);

    // Função assíncrona executada ao enviar o formulário
    const handleSubmit = async (e: React.FormEvent) => {
        // Previne o recarregamento automático da página ao submeter
        e.preventDefault();
        // Ativa o estado de envio para desabilitar o botão
        setSubmitting(true);
        // Executa a função de envio recebida via props com os dados atuais
        await onSubmit({ name, type });
        // Desativa o estado de envio após a conclusão
        setSubmitting(false);
    };

    // Renderização do formulário
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Nome do Dragão</Label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Balerion"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <Input
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Ex: Fogo, Gelo, Terra"
                    required
                />
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Salvando..." : buttonText}
            </Button>
        </form>
    );
}
