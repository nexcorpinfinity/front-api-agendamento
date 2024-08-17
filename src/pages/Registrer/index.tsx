import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';

const Register: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Registre-se</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Register </h1>
            <h1>dashboard</h1>
        </div>
    );
};
export default Register;