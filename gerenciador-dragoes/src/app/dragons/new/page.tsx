'use client';

import { useRouter } from 'next/navigation';
import { dragonService } from '@/services/api';
import { DragonFormData } from '@/types/dragon';
import { Header } from '@/components/Header';
import { DragonForm } from '@/components/DragonForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewDragonPage() {
  const router = useRouter();

  const handleCreate = async (data: DragonFormData) => {
    try {
      await dragonService.create(data);
      router.push('/dragons');
    } catch (err) {
      alert('Erro ao cadastrar o dragão.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 max-w-lg mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Dragão</CardTitle>
          </CardHeader>
          <CardContent>
            <DragonForm onSubmit={handleCreate} buttonText="Cadastrar" />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
