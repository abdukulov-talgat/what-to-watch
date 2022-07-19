import { Film, GenreFilterItem } from './types/models';


export function mapFilmsToGenres(films: Film[], limit: number): GenreFilterItem[] {
  const uniques = [...new Set(films.map((film) => film.genre))];
  return uniques.map((name) => ({name, isActive: false})).slice(0, limit);
}
