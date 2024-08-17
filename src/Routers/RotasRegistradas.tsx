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
                        />

                    <Route
                    path="/admin"
                    element={
                        <PrivateRoute isClosed={true} requiredPermission="admin">
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />

                        */}
            <Route path="/comercio" element={<Comercio />} />

            <Route path="*" element={<Error404 />} />
        </Routes>
    );
};

export default RotasRegistradas;