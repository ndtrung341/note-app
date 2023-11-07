import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user)
    return (
      <Navigate
        to={`/auth/sign-in?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace={true}
      />
    );

  return (
    <div className='container'>
      <Outlet />
    </div>
  );
};

export default MainLayout;
