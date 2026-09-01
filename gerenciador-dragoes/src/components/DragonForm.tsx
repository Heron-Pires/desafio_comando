'use client';

import { useState } from 'react';
import { DragonFormData } from '@/types/dragon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DragonFormProps {
  initialValues?: DragonFormData;
  onSubmit: (data: DragonFormData) => Promise<void>;
  buttonText: string;
}

export function DragonForm({ initialValues, onSubmit, buttonText }: DragonFormProps) {
  const [name, setName] = useState(initialValues?.name || '');
  const [type, setType] = useState(initialValues?.type || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit({ name, type });
    setSubmitting(false);
  };

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
        {submitting ? 'Salvando...' : buttonText}
      </Button>
    </form>
  );
}
