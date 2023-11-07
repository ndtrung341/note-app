import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from '~/components/Layouts/AuthLayout';
import MainLayout from '~/components/Layouts/MainLayout';
import Home from '~/pages/Home';
import SignIn from '~/pages/SignIn';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />
      }
    ]
  }
]);

export default router;
