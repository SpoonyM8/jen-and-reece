import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from './routes';
const Router = () => {
return (
  <BrowserRouter>
    <Routes>
      {routes.map(route => <Route path={route.path} element={route.getElement()} key={route.path} />)}
    </Routes>
  </BrowserRouter>
)
}

export default Router