import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { removeAuthInfoAction } from '../../store/actions';


function UserBlock() {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.authInfo);
  const isAuth = authInfo !== null;


  function handleLogoutClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(removeAuthInfoAction());
  }

  return (
    <ul className="user-block">
      {
        isAuth ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={authInfo.avatarUrl} alt="User avatar" width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <Link className="user-block__link" to={AppRoute.Logout} onClick={handleLogoutClick}>
                Sign out
              </Link>
            </li>
          </>
          :
          <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
      }


    </ul>
  );
}

export default UserBlock;
