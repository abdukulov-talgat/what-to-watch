import React, { Fragment } from 'react';

type DetailsItemProps = {
  name: string,
  value: string | string[]
}

function DetailsItem({name, value}: DetailsItemProps) {
  return (
    <p className="film-card__details-item">
      <strong className="film-card__details-name">{name}</strong>
      <span className="film-card__details-value">
        {
          typeof value === 'string' ?
            value
            :
            value.map((it, index) => {
              if (index === value.length - 1) {
                return it;
              }
              return <Fragment key={`${index * 2}`}>{it.concat(', ')} <br/></Fragment>;
            })
        }
      </span>
    </p>
  );
}

export default DetailsItem;
