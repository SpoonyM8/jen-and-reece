import Login from "../Login/Login";
import Home from "../Home/Home";

export const routes = [
  {
    path: '/',
    getElement: Login
  },
  {
    path: '/login',
    getElement: Login
  },
  {
    path: '/home',
    getElement: Home
  }
]