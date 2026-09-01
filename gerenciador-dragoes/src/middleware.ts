import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('dragon_auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Se o usuário não está logado e tenta acessar rotas privadas
  if (!token && pathname.startsWith('/dragons')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Se o usuário já está logado e tenta acessar a página de login
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/dragons', request.url));
  }

  return NextResponse.next();
}

// Configura quais rotas o Middleware deve observar
export const config = {
  matcher: ['/dragons/:path*', '/login'],
};
