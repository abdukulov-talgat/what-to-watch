import React, { ChangeEvent, Fragment } from 'react';

type RatingProps = {
  starsCount?: number,
  onRatingChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  value: number,
  disabled: boolean
}


function Rating({onRatingChange, value, disabled, starsCount = 10}: RatingProps) {
  const starsArr = new Array(starsCount).fill(0)
    .map((v, i, arr) => arr.length - i);

  return (
    <div className="rating">
      <div className="rating__stars">
        {starsArr.map((num) => (
          <Fragment key={num}>
            <input className="rating__input" id={`star-${num}`} type="radio" name="rating"
              value={num} checked={num === value} onChange={onRatingChange} disabled={disabled}
            />
            <label className="rating__label" htmlFor={`star-${num}`}>Rating {num}</label>
          </Fragment>
        ))}

      </div>
    </div>
  );
}

export default Rating;
