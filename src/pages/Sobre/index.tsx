import React from 'react';
import NavbarHome from '../../components/NavbarHome';
import { Helmet } from 'react-helmet';

const Sobre: React.FC = () => {
    return (
        <div>
            <Helmet>
                <title>Sobre nós</title>
            </Helmet>
            <NavbarHome />
            <h1>Pagina Sobre </h1>
            <h1>dashboard</h1>
        </div>
    );
};
export default Sobre;