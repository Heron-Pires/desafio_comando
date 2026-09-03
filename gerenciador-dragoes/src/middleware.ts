// Importa os utilitários do Next.js para manipulação de requisições e respostas HTTP no servidor
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Função que intercepta as requisições antes de carregar a página
export function middleware(request: NextRequest) {
    // Obtém o token de autenticação salvo nos cookies do navegador
    const token = request.cookies.get("dragon_auth_token")?.value;
    // Extrai o caminho da URL que o usuário está tentando acessar (ex: '/dragons', '/login')
    const { pathname } = request.nextUrl;

    // Se o usuário não está logado e tenta acessar rotas privadas
    if (!token && pathname.startsWith("/dragons")) {
        // Redireciona forçadamente o usuário para a página de login
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Se o usuário já está logado e tenta acessar a página de login
    if (token && pathname === "/login") {
        // Redireciona diretamente para a lista de dragões, evitando login duplicado
        return NextResponse.redirect(new URL("/dragons", request.url));
    }
    // Libera o acesso e permite que a requisição siga normalmente caso passe nas verificações
    return NextResponse.next();
}

// Configura quais rotas o Middleware deve observar
export const config = {
    // Executa o middleware na página de login e em todas as páginas/subrotas abaixo de /dragons
    matcher: ["/dragons/:path*", "/login"],
};
