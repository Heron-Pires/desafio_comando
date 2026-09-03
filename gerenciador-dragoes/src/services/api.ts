// Importa os tipos TypeScript para o dragão e para os dados vindos de formulários
import { Dragon, DragonFormData } from "@/types/dragon";

// URL base do endpoint da API externa onde os dados dos dragões estão hospedados
const BASE_URL = "https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon";

// Objeto que agrupa todos os métodos de integração com o serviço de dragões
export const dragonService = {
    // GET: Buscar todos os dragões e ordenar alfabeticamente
    async getAll(): Promise<Dragon[]> {
        // Faz a requisição GET garantindo que não utilizará dados em cache (cache: 'no-store')
        const response = await fetch(BASE_URL, { cache: "no-store" });

        // Lança um erro se o status HTTP não for de sucesso (200-299)
        if (!response.ok) {
            throw new Error("Falha ao buscar a lista de dragões");
        }

        // Converte a resposta recebida para formato JSON
        const data: Dragon[] = await response.json();

        // Ordenação alfabética
        return data.sort((a, b) =>
            a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
        );
    },

    // GET: Buscar detalhes de um único dragão por ID
    async getById(id: string): Promise<Dragon> {
        // Faz a chamada passando o ID na rota e desabilitando o cache
        const response = await fetch(`${BASE_URL}/${id}`, {
            cache: "no-store",
        });

        // Lança um erro caso o dragão não seja encontrado ou a requisição falhe
        if (!response.ok) {
            throw new Error("Falha ao buscar os detalhes do dragão");
        }

        // Retorna o objeto do dragão retornado pela API
        return response.json();
    },

    // POST: Cadastrar novo dragão
    async create(data: DragonFormData): Promise<Dragon> {
        const response = await fetch(BASE_URL, {
            method: "POST", // Define o método HTTP como POST
            headers: {
                "Content-Type": "application/json", // Informa à API que os dados estão em formato JSON
            },
            body: JSON.stringify({
                ...data, // Espalha os campos do formulário (nome e tipo)
                createdAt: new Date().toISOString(), // Adiciona a data/hora atual de criação em formato ISO
            }),
        });

        // Lança exceção caso ocorra falha na gravação do registro
        if (!response.ok) {
            throw new Error("Falha ao cadastrar o dragão");
        }

        // Retorna os dados do dragão recém-criado confirmados pela API
        return response.json();
    },

    // PUT: Editar dragão existente
    async update(id: string, data: DragonFormData): Promise<Dragon> {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT", // Define o método HTTP como PUT para substituição/atualização dos dados
            headers: {
                "Content-Type": "application/json", // Configura o cabeçalho para corpo em JSON
            },
            body: JSON.stringify(data), // Converte o objeto de dados alterados para string JSON
        });

        // Lança exceção se houver falha na alteração
        if (!response.ok) {
            throw new Error("Falha ao atualizar o dragão");
        }

        // Retorna o objeto do dragão com as informações atualizadas
        return response.json();
    },

    // DELETE: Remover dragão
    async delete(id: string): Promise<void> {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE", // Define o método HTTP como DELETE
        });

        // Lança exceção se a exclusão falhar
        if (!response.ok) {
            throw new Error("Falha ao deletar o dragão");
        }
    },
};
