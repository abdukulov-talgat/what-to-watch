import React from 'react';

type FilmNavProps = {
  activeIndex: number,
  items: string[],
  onTabItemClick: (index: number) => void
}

function FilmNav({activeIndex, items, onTabItemClick}: FilmNavProps) {

  function handleLinkClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    const hash = (evt.target as HTMLAnchorElement).hash;
    const index = Number(hash.slice(1));
    onTabItemClick(index);
  }

  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {items.map((it, index) => (
          <li key={it} className={`film-nav__item ${activeIndex === index ? 'film-nav__item--active' : ''}`}>
            <a href={`#${index.toString()}`} className="film-nav__link" onClick={handleLinkClick}>{it}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default FilmNav;
