import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { Permissions } from './Permissions';
import PrivateRoute from './PrivateRouter';

import Admin from '../pages/Admin';
import AdminConfiguration from '../pages/Admin/AdminConfiguration';
import AdminGestaoDeComercios from '../pages/Admin/AdminGestaoDeComercios';
import AdminGestaoDePagamentos from '../pages/Admin/AdminGestaoDePagamentos';
import AdminGestaoDeUsuarios from '../pages/Admin/AdminGestaoDeUsuarios';
import AdminNotifications from '../pages/Admin/AdminNotifications';
import AdminPerfil from '../pages/Admin/AdminPerfil';
import AdminTickets from '../pages/Admin/AdminTickets';

import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { LoginAndRegisterBusiness } from '../pages/auth/LoginAndRegisterBusiness';
import { Sucess } from '../pages/auth/Sucess';
import Comercio from '../pages/Comercio';
import ComercioConfiguration from '../pages/Comercio/ComercioConfiguration';
import ComercioControleDeEstoque from '../pages/Comercio/ComercioControleDeEstoque';
import ComercioPerfil from '../pages/Comercio/ComercioPerfil';
import ComercioRealizarVenda from '../pages/Comercio/ComercioRealizarVenda';
import ComercioRelatorioMensal from '../pages/Comercio/ComercioRelatorioMensal';
import { Error404 } from '../pages/errors/Error404';
import { Redirect } from '../pages/errors/Redirect';
import { Unauthorized } from '../pages/errors/Unauthorized';
import { RootState } from '../store/modules/rootReducer';
import { GlobalStyled } from '../styles/GlobalStyled';

const adminRoutes = [
  { path: '/admin', element: <Admin /> },
  { path: '/admin/notifications', element: <AdminNotifications /> },
  { path: '/admin/gestao-comercio', element: <AdminGestaoDeComercios /> },
  { path: '/admin/gestao-pagamentos', element: <AdminGestaoDePagamentos /> },
  { path: '/admin/gestao-usuarios', element: <AdminGestaoDeUsuarios /> },
  { path: '/admin/gestao-ticket', element: <AdminTickets /> },
  { path: '/admin/configuracao', element: <AdminConfiguration /> },
  { path: '/admin/perfil', element: <AdminPerfil /> },
];

const costumerRoutes = [
  { path: '/comercio', element: <Comercio /> },
  { path: '/comercio/realizar-venda', element: <ComercioRealizarVenda /> },
  { path: '/comercio/controle-de-estoque', element: <ComercioControleDeEstoque /> },
  { path: '/comercio/relatorios', element: <ComercioRelatorioMensal /> },
  { path: '/comercio/configuracao', element: <ComercioConfiguration /> },
  { path: '/comercio/perfil', element: <ComercioPerfil /> },
];

const publicRoutes = [
  { path: '/', element: <LoginAndRegisterBusiness /> },
  { path: '/password/reset', element: <ForgotPassword /> },
  { path: '/auth/success', element: <Sucess /> },
  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '/redirect', element: <Redirect /> },
  { path: '*', element: <Error404 /> },
];

const RegistredRouters: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      <GlobalStyled $active={theme} />
      <Routes>
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute isClosed requiredPermission={Permissions.Admin}>
                {element}
              </PrivateRoute>
            }
          />
        ))}

        {costumerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute isClosed requiredPermission={Permissions.Costumer}>
                {element}
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </>
  );
};

export { RegistredRouters };
