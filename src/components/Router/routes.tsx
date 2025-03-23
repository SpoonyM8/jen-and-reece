import Login from "../Login/Login";
import Home from "../Home/Home";
import GymTracker from "../GymTracker/GymTracker";

export const unprotectedRoutes = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/login',
    element: <Login />
  },
];

export const protectedRoutes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/gym',
    element: <GymTracker />
  }
];
