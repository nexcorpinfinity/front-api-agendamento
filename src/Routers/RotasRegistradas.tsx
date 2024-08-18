import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './RotaPrivada';

import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Comercio from '../pages/Comercio';
import Sobre from '../pages/Sobre';
import Register from '../pages/Registrer';
import Login from '../pages/Login';
import Contato from '../pages/Contato';
import Planos from '../pages/Planos';
import PrivateRoute from './RotaPrivada';
import Admin from '../pages/Admin';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminNotifications from '../pages/Admin/AdminNotifications';
import AdminGestaoDeComercios from '../pages/Admin/AdminGestaoDeComercios';
import AdminGestaoDePagamentos from '../pages/Admin/AdminGestaoDePagamentos';
import AdminGestaoDeUsuarios from '../pages/Admin/AdminGestaoDeUsuarios';
import AdminTickets from '../pages/Admin/AdminConfiguration';
import AdminConfiguration from '../pages/Admin/AdminTickets';
import ComercioControleDeEstoque from '../pages/Comercio/ComercioControleDeProdutos';
import ComercioControleDeProdutos from '../pages/Comercio/ComercioControleDeEstoque';
import ComercioConfiguration from '../pages/Comercio/ComercioConfiguration';
import ComercioPerfil from '../pages/Comercio/ComercioPerfil';
import Unauthorized from '../pages/Unauthorized';
import Redirect from '../pages/Redirect';

const RotasRegistradas: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/planos" element={<Planos />} />

            <Route path="/login" element={<Login />} />
            <Route path="/criar-conta" element={<Register />} />
            {/* <Route
                path="/contas"
                element={
                    <PrivateRoute isClosed={true}>
                        <Error404 />
                    </PrivateRoute>
                }
            /> */}

            <Route
                path="/admin"
                element={
                    <PrivateRoute isClosed={true} requiredPermission="admin">
                        <Admin />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoute isClosed={true} requiredPermission="admin">
                        <AdminDashboard />
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
                path="/comercio"
                element={
                    <PrivateRoute isClosed={true} requiredPermission="costumer">
                        <Comercio />
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
                path="/comercio/controle-de-produtos"
                element={
                    <PrivateRoute isClosed={true} requiredPermission="costumer">
                        <ComercioControleDeProdutos />
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
    );
};

export default RotasRegistradas;