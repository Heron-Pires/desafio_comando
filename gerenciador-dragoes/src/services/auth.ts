// Importa a biblioteca 'js-cookie' para manipulação simplificada de cookies no navegador
import Cookies from "js-cookie";

// Chave/nome do cookie onde o token de autenticação fica armazenado
const AUTH_COOKIE_KEY = "dragon_auth_token";

// Credenciais fixas (mockadas) utilizadas para validação do login do usuário
const VALID_EMAIL = "admin@email.com";
const VALID_PASSWORD = "123456";

// Objeto que centraliza os métodos e regras de negócio referentes à autenticação
export const authService = {
    // Autentica o usuário comparando o e-mail e senha com as credenciais fixas
    login(email: string, password: string): boolean {
        if (email === VALID_EMAIL && password === VALID_PASSWORD) {
            // Salva um token fake no cookie por 1 dia
            Cookies.set(AUTH_COOKIE_KEY, "authenticated_user_token", {
                expires: 1,
            });
            return true; // Login realizado com sucesso
        }
        return false; // Credenciais incorretas
    },

    // Remove o cookie de autenticação, encerrando a sessão do usuário
    logout(): void {
        Cookies.remove(AUTH_COOKIE_KEY);
    },

    // Verifica se o cookie de autenticação existe para confirmar se o usuário está logado
    isAuthenticated(): boolean {
        return !!Cookies.get(AUTH_COOKIE_KEY);
    },
};
