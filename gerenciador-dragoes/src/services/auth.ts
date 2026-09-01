import Cookies from 'js-cookie';

const AUTH_COOKIE_KEY = 'dragon_auth_token';

// Dados do usuário fixo exigidos
const VALID_EMAIL = 'admin@email.com';
const VALID_PASSWORD = '123456';

export const authService = {
  login(email: string, password: string): boolean {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Salva um token fake no cookie por 1 dia
      Cookies.set(AUTH_COOKIE_KEY, 'authenticated_user_token', { expires: 1 });
      return true;
    }
    return false;
  },

  logout(): void {
    Cookies.remove(AUTH_COOKIE_KEY);
  },

  isAuthenticated(): boolean {
    return !!Cookies.get(AUTH_COOKIE_KEY);
  }
};
