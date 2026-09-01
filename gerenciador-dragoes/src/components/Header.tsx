'use client';

import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';
import { Button } from '@/components/ui/button';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-bold text-slate-800">
          🐉 Gerenciador de Dragões
        </h1>
        <Button variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </header>
  );
}
