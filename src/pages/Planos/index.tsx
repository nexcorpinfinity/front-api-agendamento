import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';

const Planos: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Planos</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Planos </h1>
            <h1>dashboard</h1>
        </div>
    );
};
export default Planos;