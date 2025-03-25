import { lazy } from 'react';

const Dashboard = lazy(() => import('./pages/dashboard'));
// const brand = lazy(() => import('./pages/brand'));
const Profile = lazy(() => import('./pages/profile'));
const Books = lazy(() => import('./pages/books'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/profile', element: Profile },
  { path: '/books', element: Books },
];

export default routes;
