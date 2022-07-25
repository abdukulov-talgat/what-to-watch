import React, { useEffect, useState } from 'react';
import { CommentGet } from '../../types/models';
import { createAPI } from '../../services/api';
import { ApiRoute } from '../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import FilmReviewsColumn from '../film-reviews-column/film-reviews-column';


type FilmReviewsProps = {
  id: number
}


function FilmReviews({id}: FilmReviewsProps) {
  const [reviews, setReviews] = useState<CommentGet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const middle = Math.ceil(reviews.length / 2);

  useEffect(() => {
    if (isLoading) {
      createAPI().get<CommentGet[]>(ApiRoute.Comments(id))
        .then((response) => {
          setReviews(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, isLoading]);

  return (
    <div className="film-card__reviews film-card__row">
      {isLoading ?
        'Loading...'
        :
        <>
          {reviews.length === 0 && 'No reviews in database'}
          <FilmReviewsColumn reviews={reviews.slice(0, middle)}/>
          <FilmReviewsColumn reviews={reviews.slice(middle)}/>
        </>}
    </div>
  );
}

export default FilmReviews;
