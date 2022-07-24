import Logo from '../../components/logo/logo';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { createAPI } from '../../services/api';
import { CommentGet, Film } from '../../types/models';
import { ApiRoute, AppRoute } from '../../const';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/spinner';
import UserBlock from '../../components/user-block/user-block';
import Rating from '../../components/rating/rating';
import { commentIsValid } from '../../utils';


function AddReview() {
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film>();
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => () => {
    createAPI().get<Film>(ApiRoute.SingleFilm(Number(id)))
      .then((response) => setFilm(response.data))
      .catch((err: AxiosError) => {
        toast.error(err.message);
      })
      .finally(() => setIsLoading(false));

  }, [id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  const breadcrumbs = [
    [AppRoute.Film.replace(':id', id), film?.name || ''],
    ['', 'Add review']
  ];

  function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (!film) {
      return;
    }
    setIsSending(true);
    createAPI().post<CommentGet[]>(ApiRoute.Comments(Number(id)), {rating, comment})
      .then(() => {
        toast.info('Review added.');
        navigate(AppRoute.Film.replace(':id', film.id.toString()));
      })
      .catch((err: AxiosError) => toast.error(err.message))
      .finally(() => setIsSending(false));
  }

  function handleRatingChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(Number(evt.target.value));
  }

  function isFormValid() {
    return commentIsValid(comment) && rating >= 1;
  }

  return (
    isLoading ?
      <Spinner/>
      :
      <section className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo/>
            <Breadcrumbs items={breadcrumbs}/>
            <UserBlock/>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film?.posterImage} alt={film?.name} width="218"
              height="327"
            />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
            <Rating onRatingChange={handleRatingChange} value={rating} disabled={isSending}/>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" disabled={isSending}
                placeholder="Review text" onChange={(evt) => setComment(evt.target.value)} value={comment}
              >
              </textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit" disabled={!isFormValid() || isSending}>Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
  );
}

export default AddReview;
