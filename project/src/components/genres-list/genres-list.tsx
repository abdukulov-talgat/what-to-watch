import React from 'react';

type GenresListProps = {
  genres: string[],
  activeGenre: string,
  onGenreChange: (genre: string) => void
}

function GenresList({genres, activeGenre, onGenreChange}: GenresListProps) {

  function handleLinkClick(evt: React.SyntheticEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    const target = evt.target as HTMLAnchorElement;
    const genre = decodeURI(target.hash).slice(1);

    if (activeGenre !== genre) {
      onGenreChange(genre);
    }
  }

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className=
          {activeGenre === genre ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}
        >
          <a href={`#${genre}`} className="catalog__genres-link" onClick={handleLinkClick}>{genre}</a>
        </li>
      ))}
    </ul>
  );
}

export default GenresList;
