import React from 'react';

import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './RotaPrivada';

import Admin from '../pages/Admin';
import AdminConfiguration from '../pages/Admin/AdminConfiguration';
import AdminGestaoDeComercios from '../pages/Admin/AdminGestaoDeComercios';
import AdminGestaoDePagamentos from '../pages/Admin/AdminGestaoDePagamentos';
import AdminGestaoDeUsuarios from '../pages/Admin/AdminGestaoDeUsuarios';
import AdminNotifications from '../pages/Admin/AdminNotifications';
import AdminPerfil from '../pages/Admin/AdminPerfil';
import AdminTickets from '../pages/Admin/AdminTickets';
import Comercio from '../pages/Comercio';
import ComercioConfiguration from '../pages/Comercio/ComercioConfiguration';
import ComercioControleDeEstoque from '../pages/Comercio/ComercioControleDeEstoque';
import ComercioPerfil from '../pages/Comercio/ComercioPerfil';
import ComercioRealizarVenda from '../pages/Comercio/ComercioRealizarVenda';
import ComercioRelatorioMensal from '../pages/Comercio/ComercioRelatorioMensal';
import Error404 from '../pages/Error404';
import Login from '../pages/Login';
import Redirect from '../pages/Redirect';
import Register from '../pages/Registrer';
import Unauthorized from '../pages/Unauthorized';
import { RootState } from '../store/modules/rootReducer';
import { GlobalStyled } from '../styles/GlobalStyled';

const RotasRegistradas: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    return (
        <>
            <GlobalStyled $active={theme} />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/criar-conta" element={<Register />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <Admin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/notifications"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminNotifications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-comercio"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminGestaoDeComercios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-pagamentos"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminGestaoDePagamentos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-usuarios"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminGestaoDeUsuarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-ticket"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminTickets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/configuracao"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminConfiguration />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/perfil"
                    element={
                        <PrivateRoute isClosed requiredPermission="admin">
                            <AdminPerfil />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/comercio"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <Comercio />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/realizar-venda"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <ComercioRealizarVenda />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/controle-de-estoque"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <ComercioControleDeEstoque />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/relatorios"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <ComercioRelatorioMensal />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/configuracao"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <ComercioConfiguration />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/perfil"
                    element={
                        <PrivateRoute isClosed requiredPermission="costumer">
                            <ComercioPerfil />
                        </PrivateRoute>
                    }
                />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/redirect" element={<Redirect />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
};

export default RotasRegistradas;
