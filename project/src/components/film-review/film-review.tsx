import React from 'react';
import { CommentGet } from '../../types/models';
import dayjs from 'dayjs';


type FilmReviewProps = {
  review: CommentGet
}

function FilmReview({review}: FilmReviewProps) {

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{review.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{review.user.name}</cite>
          <time className="review__date" dateTime={review.date}>{dayjs().format('MMMM DD, YYYY')}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{review.rating.toFixed(1)}</div>
    </div>
  );
}

export default FilmReview;
