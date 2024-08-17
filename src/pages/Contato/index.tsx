import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';

const Contato: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Contato</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Contato </h1>
            <h1>dashboard</h1>
        </div>
    );
};
export default Contato;