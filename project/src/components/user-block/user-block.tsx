import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { signOut } from '../../store/actions';


function UserBlock() {
  const dispatch = useAppDispatch();
  const authInfo = useAppSelector((state) => state.authInfo);
  const isAuth = authInfo !== null;
  const navigate = useNavigate();

  function handleLogoutClick(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(signOut());
    navigate(AppRoute.Main);
  }

  return (
    <ul className="user-block">

      {
        isAuth ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
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

export default React.memo(UserBlock);
