import { Film } from './types/models';

const EMAIL_REGEXP = /^[\w\-.]+@[\w-]+\.+[\w-]{2,4}$/i;
const HAS_DIGIT_REGEXP = /\d+/;
const HAS_SYMBOL_REGEXP = /\D+/;

export function humanizeDuration(duration: number, format: 'default' | 'secondary' = 'default') {
  if (format === 'default') {
    const date = new Date(0, 0, 0, 0, 0, duration);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }
  const date = new Date(0, 0, 0, 0, duration, 0);
  return `${date.getHours()}h ${date.getMinutes()}m`;
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

export function mapRatingToWord(rating: number) {
  if (rating < 3) {
    return 'Bad';
  }
  if (rating >= 3 && rating < 5) {
    return 'Normal';
  }
  if (rating >= 5 && rating < 8) {
    return 'Good';
  }
  if (rating >= 8 && rating < 10) {
    return 'Very good';
  }
  return 'Awesome';
}

export function commentIsValid(comment: string) {
  return comment.length >= 50 && comment.length <= 400;
}
