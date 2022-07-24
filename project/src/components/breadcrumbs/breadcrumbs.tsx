import React from 'react';
import { Link } from 'react-router-dom';

type BreadcrumbsProps = {
  items: string[][]
}


function Breadcrumbs({items}: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        {items.slice(0, items.length - 1).map((pair) => (
          <li key={pair[0]} className="breadcrumbs__item">
            <Link to={pair[0]} className="breadcrumbs__link">{pair[1]}</Link>
          </li>
        ))}
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">{items[items.length - 1][1]}</a>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
