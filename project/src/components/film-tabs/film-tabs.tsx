import React, { useEffect, useState } from 'react';
import FilmNav from '../film-nav/film-nav';
import FilmRating from '../film-rating/film-rating';
import { Film } from '../../types/models';
import DetailsItem from '../details-item/details-item';
import { humanizeDuration } from '../../utils';

import FilmReviews from '../film-reviews/film-reviews';


type FilmTabsProps = {
  film: Film,
}

const TAB_ITEMS = ['Overview', 'Details', 'Reviews'];


function FilmTabs({film}: FilmTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  useEffect(() => () => {
    setActiveTabIndex(0);
  }, [film]);


  function handleTabItemClick(index: number) {
    if (index !== activeTabIndex) {
      setActiveTabIndex(index);
    }
  }

  return (
    <div className="film-card__desc">
      <FilmNav activeIndex={activeTabIndex} items={TAB_ITEMS} onTabItemClick={handleTabItemClick}/>
      {
        activeTabIndex === 0 &&
        <>
          <FilmRating film={film}/>
          <div className="film-card__text">
            {film.description}

            <p className="film-card__director"><strong>Director: {film.director}</strong></p>

            <p className="film-card__starring">
              <strong>
                Starring: {film.starring.join(', ')} and other
              </strong>
            </p>
          </div>
        </>
      }
      {
        activeTabIndex === 1 &&
        <div className="film-card__text film-card__row">
          <div className="film-card__text-col">
            <DetailsItem name='Director' value={film.director}/>
            <DetailsItem name='Starring' value={film.starring}/>
          </div>
          <div className="film-card__text-col">
            <DetailsItem name="Run Time" value={humanizeDuration(film.runTime, 'secondary')}/>

            <p className="film-card__details-item">
              <strong className="film-card__details-name">Genre</strong>
              <span className="film-card__details-value">Comedy</span>
            </p>
            <p className="film-card__details-item">
              <strong className="film-card__details-name">Released</strong>
              <span className="film-card__details-value">2014</span>
            </p>
          </div>
        </div>
      }
      {
        activeTabIndex === 2 &&
        <FilmReviews id={film.id}/>
      }
    </div>
  );
}

export default FilmTabs;
