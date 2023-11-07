import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const AuthLayout = () => {
  const { user } = useAuth();
  if (user) return <Navigate to='/' replace />;
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default AuthLayout;
