const AUTH_TOKEN_KEY = 'wtw-token';

export function saveToken(token: string) {
  return localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY) || '';
}
