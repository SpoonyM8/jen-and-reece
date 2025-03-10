import { BrowserRouter, Route, Routes } from "react-router-dom"
import { protectedRoutes, unprotectedRoutes } from './routes';
import ProtectedRoute from "./ProtectedRoute";
import LoginRedirect from "./LoginRedirect";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginRedirect />} >
          {unprotectedRoutes.map(route => <Route path={route.path} element={route.element} key={route.path} />)}
        </Route>
        <Route element={<ProtectedRoute />} >
          {protectedRoutes.map(route => <Route path={route.path} element={route.element} key={route.path} />)}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router