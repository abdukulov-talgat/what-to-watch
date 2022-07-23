import { Film } from './types/models';

const EMAIL_REGEXP = /^[\w\-.]+@[\w-]+\.+[\w-]{2,4}$/i;
const HAS_DIGIT_REGEXP = /\d+/;
const HAS_SYMBOL_REGEXP = /\D+/;

export function humanizeDuration(duration: number) {
  const date = new Date(0, 0, 0, 0, 0, duration);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
}


export function validateEmail(email: string) {
  return EMAIL_REGEXP.test(email);
}

export function validatePassword(password: string) {
  return HAS_DIGIT_REGEXP.test(password) && HAS_SYMBOL_REGEXP.test(password);
}


export function mapFilmsToGenres(films: Film[]): string[] {
  return [...new Set(films.map((film) => film.genre))];
}
