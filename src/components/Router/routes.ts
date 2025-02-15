import Login from "../Login/Login";

export const routes = [
  {
    path: '/',
    getElement: Login
  },
  {
    path: '/login',
    getElement: Login
  }
]