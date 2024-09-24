import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './RotaPrivada';
import Error404 from '../pages/Error404';
import Register from '../pages/Registrer';

import Admin from '../pages/Admin';
import AdminNotifications from '../pages/Admin/AdminNotifications';
import AdminGestaoDeComercios from '../pages/Admin/AdminGestaoDeComercios';
import AdminGestaoDePagamentos from '../pages/Admin/AdminGestaoDePagamentos';
import AdminGestaoDeUsuarios from '../pages/Admin/AdminGestaoDeUsuarios';
import AdminConfiguration from '../pages/Admin/AdminConfiguration';
import AdminTickets from '../pages/Admin/AdminTickets';
import AdminPerfil from '../pages/Admin/AdminPerfil';
import ComercioRealizarVenda from '../pages/Comercio/ComercioRealizarVenda';
import ComercioConfiguration from '../pages/Comercio/ComercioConfiguration';
import ComercioPerfil from '../pages/Comercio/ComercioPerfil';
import ComercioControleDeEstoque from '../pages/Comercio/ComercioControleDeEstoque';
import ComercioRelatorioMensal from '../pages/Comercio/ComercioRelatorioMensal';
import Unauthorized from '../pages/Unauthorized';
import Redirect from '../pages/Redirect';
import { GlobalStyled } from '../styles/GlobalStyled';
import { useSelector } from 'react-redux';
import { RootState } from '../store/modules/rootReducer';
import Login from '../pages/Login';
import Comercio from '../pages/Comercio';

const RotasRegistradas: React.FC = () => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    return (

        <>
            <GlobalStyled $active={theme}/>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/criar-conta" element={<Register />} />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <Admin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/notifications"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminNotifications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-comercio"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminGestaoDeComercios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-pagamentos"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminGestaoDePagamentos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-usuarios"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminGestaoDeUsuarios />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/gestao-ticket"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminTickets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/configuracao"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminConfiguration />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/admin/perfil"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminPerfil />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/comercio"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
                            <Comercio />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/realizar-venda"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
                            <ComercioRealizarVenda />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/controle-de-estoque"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
                            <ComercioControleDeEstoque />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/relatorios"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
                            <ComercioRelatorioMensal />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/configuracao"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
                            <ComercioConfiguration />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/comercio/perfil"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="costumer">
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