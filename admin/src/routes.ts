import { lazy } from 'react';

const Dashboard = lazy(() => import('./pages/dashboard'));
const brand = lazy(() => import('./pages/brand'));
const Profile = lazy(() => import('./pages/profile'));
const Books = lazy(() => import('./pages/books'));
const Audios = lazy(() => import('./pages/audios'));

const routes = [
  { path: '/', element: Dashboard },
  { path: '/brand', element: brand },
  { path: '/profile', element: Profile },
  { path: '/books', element: Books },
  { path: '/audios', element: Audios },
];

export default routes;
