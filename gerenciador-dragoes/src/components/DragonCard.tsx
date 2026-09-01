'use client';

import Link from 'next/link';
import { Dragon } from '@/types/dragon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface DragonCardProps {
  dragon: Dragon;
  onDelete: (id: string) => void;
}

export function DragonCard({ dragon, onDelete }: DragonCardProps) {
  return (
    <Card className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg capitalize">{dragon.name}</CardTitle>
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
