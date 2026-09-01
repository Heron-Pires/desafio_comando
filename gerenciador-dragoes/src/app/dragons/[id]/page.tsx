'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Dragon } from '@/types/dragon';
import { dragonService } from '@/services/api';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function DragonDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [dragon, setDragon] = useState<Dragon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dragonService.getById(id)
      .then(setDragon)
      .catch(() => setError('Erro ao carregar detalhes do dragão.'))
      .finally(() => setLoading(false));
  }, [id]);

  // Função para formatar a data ISO de criação no padrão brasileiro
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto p-4 max-w-lg mt-6">
        {loading && (
          <p className="text-center text-slate-500 py-10">Carregando detalhes...</p>
        )}

        {error && (
          <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
            {error}
          </div>
        )}

        {!loading && !error && dragon && (
          <Card className="shadow-md">
            <CardHeader className="border-b">
              <CardTitle className="text-2xl capitalize text-slate-800">
                {dragon.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div>
                <p className="text-sm text-slate-500">Tipo de Dragão</p>
                <p className="text-lg font-medium text-slate-700">{dragon.type}</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Data de Criação</p>
                <p className="text-base text-slate-700">
                  {formatDate(dragon.createdAt)}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Link href="/dragons">
                <Button variant="outline">Voltar</Button>
              </Link>
              <Link href={`/dragons/${dragon.id}/edit`}>
                <Button variant="secondary">Editar</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
