import { lazy } from 'react';

// project imports
import Loadable from 'components/loadable';
import MinimalLayout from 'layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));
const UserNameAndEmailInput = Loadable(lazy(() => import('features/authentication/forgot-password-page/components/UserNameAndEmailInput')));
const NewPassword=Loadable(lazy(()=>import('features/authentication/forgot-password-page/components/NewPassword')))


// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    },
    {
      path: '/forgot-password',
      element: <UserNameAndEmailInput />
    },
    {
      path: '/new-password',
      element: <NewPassword />
    }
  ]
};

export default AuthenticationRoutes;
