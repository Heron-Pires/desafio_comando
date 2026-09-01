import { Dragon, DragonFormData } from '@/types/dragon';

const BASE_URL = 'https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon';

export const dragonService = {
  // GET: Buscar todos os dragões e ordenar alfabeticamente
  async getAll(): Promise<Dragon[]> {
    const response = await fetch(BASE_URL, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Falha ao buscar a lista de dragões');
    }

    const data: Dragon[] = await response.json();

    // Ordenação alfabética exigida no desafio (A-Z)
    return data.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
  },

  // GET: Buscar detalhes de um único dragão por ID
  async getById(id: string): Promise<Dragon> {
    const response = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error('Falha ao buscar os detalhes do dragão');
    }

    return response.json();
  },

  // POST: Cadastrar novo dragão
  async create(data: DragonFormData): Promise<Dragon> {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Falha ao cadastrar o dragão');
    }

    return response.json();
  },

  // PUT: Editar dragão existente
  async update(id: string, data: DragonFormData): Promise<Dragon> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Falha ao atualizar o dragão');
    }

    return response.json();
  },

  // DELETE: Remover dragão
  async delete(id: string): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao deletar o dragão');
    }
  },
};
