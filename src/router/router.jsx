/* eslint-disable */
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import LoginPage from "../pages/LoginPage/LoginPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage/CadastroUsuarioPage";
import ErroPage from "../pages/ErroPage/ErroPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import CadastroLocalPage from "../pages/CadastroLocalPage/CadastroLocalPage";
import ListaLocalPage from "../pages/ListaLocalPage/ListaLocalPage";

const isAuthenticated = localStorage.getItem("usuarioLogado") !== null;

const PrivateRoute = ({ children }) => {
 return isAuthenticated ? children : <LoginPage />;
};

const routers = createBrowserRouter([
 {
  path: "/",
  element: <LoginPage />
 },
 {
  path: "/cadastroUsuario",
  element: <CadastroUsuarioPage />
 },
 {
  path: "/",
  element: <App />,
  errorElement: <ErroPage />,
  children: [
   {
    path: "/dashboard",
    element: (
     <PrivateRoute>
      <DashboardPage />
     </PrivateRoute>
    )
   },
   {
    path: "/cadastroLocal",
    element: (
     <PrivateRoute>
      <CadastroLocalPage />
     </PrivateRoute>
    )
   },
   {
    path: "/cadastroLocal/:id",
    element: (
     <PrivateRoute>
      <CadastroLocalPage />
     </PrivateRoute>
    )
   },
   {
    path: "/listaLocal",
    element: (
     <PrivateRoute>
      <ListaLocalPage />
     </PrivateRoute>
    )
   }
  ]
 }
]);

export default routers;
