// Interface que define a estrutura completa do objeto Dragão retornado pela API
export interface Dragon {
    id: string;
    name: string;
    type: string;
    createdAt: string;
    histories?: string[]; // Histórico de alterações ou notas (campo opcional)
}

// Interface que define apenas os campos necessários ao enviar o formulário (criação ou edição)
export interface DragonFormData {
    name: string;
    type: string;
}
