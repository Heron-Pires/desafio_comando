'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { dragonService } from '@/services/api';
import { Dragon, DragonFormData } from '@/types/dragon';
import { Header } from '@/components/Header';
import { DragonForm } from '@/components/DragonForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditDragonPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [dragon, setDragon] = useState<Dragon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dragonService.getById(id)
      .then(setDragon)
      .catch(() => alert('Erro ao carregar dados do dragão.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (data: DragonFormData) => {
    try {
      await dragonService.update(id, data);
      router.push('/dragons');
    } catch (err) {
      alert('Erro ao atualizar o dragão.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <p className="text-center mt-10 text-slate-500">Carregando dados...</p>
      </div>
    );
  }

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
                initialValues={{ name: dragon.name, type: dragon.type }}
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
