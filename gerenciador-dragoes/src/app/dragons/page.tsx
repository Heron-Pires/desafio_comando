'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Dragon } from '@/types/dragon';
import { dragonService } from '@/services/api';
import { Header } from '@/components/Header';
import { DragonCard } from '@/components/DragonCard';
import { Button } from '@/components/ui/button';

export default function DragonsListPage() {
  const [dragons, setDragons] = useState<Dragon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDragons = async () => {
    try {
      setLoading(true);
      const data = await dragonService.getAll();
      setDragons(data);
    } catch (err) {
      setError('Erro ao carregar a lista de dragões.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDragons();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja remover este dragão?')) {
      try {
        await dragonService.delete(id);
        // Atualiza a lista removendo o item deletado
        setDragons((prev) => prev.filter((d) => d.id !== id));
      } catch (err) {
        alert('Erro ao deletar o dragão.');
      }
    }
  };

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
