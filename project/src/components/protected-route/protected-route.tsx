import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute } from '../../const';


function ProtectedRoute(): JSX.Element {
  //get AuthStatus from redux
  const authStatus = false;

  if (!authStatus) {
    return <Navigate to={AppRoute.Login} replace />;
  }

  return (
    <Outlet />
  );
}

export default ProtectedRoute;
