import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/store';


function ProtectedRoute(): JSX.Element {
  const isAuth = useAppSelector((state) => state.authInfo !== null);

  if (!isAuth) {
    return <Navigate to={AppRoute.Login} replace/>;
  }

  return (
    <Outlet/>
  );
}

export default ProtectedRoute;
