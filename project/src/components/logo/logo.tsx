import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


type LogoProps = {
  variant?: 'default' | 'light';
}

function Logo({variant = 'default'}: LogoProps) {
  const linkClass = variant === 'default' ? 'logo__link' : 'logo__link logo__link--light';
  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={linkClass}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default React.memo(Logo);
