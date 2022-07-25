import React from 'react';
import { CommentGet } from '../../types/models';
import FilmReview from '../film-review/film-review';

type FilmReviewsColumnProps = {
  reviews: CommentGet[]
}

function FilmReviewsColumn({reviews}: FilmReviewsColumnProps) {
  return (
    <div className="film-card__reviews-col">
      {reviews.map((review) => <FilmReview key={review.id} review={review}/>)}
    </div>
  );
}

export default FilmReviewsColumn;
