import React from 'react';
import NavbarHome from '../../components/NavbarHome';

const Unauthorized: React.FC = () => {
    return (
        <div>

            <NavbarHome />
            <h1>Pagina Unauthorized </h1>
            <div>
                <h1>Unauthorized Access</h1>
                <a href="/">Return</a>
            </div>
        </div>
    );
};
export default Unauthorized;