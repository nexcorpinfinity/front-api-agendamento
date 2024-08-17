import React from 'react';

import RotasRegistradas from './Routers/RotasRegistradas';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyled } from './GlobalStyled';
import { AuthProvider } from './contexts/AuthProvider';

const App: React.FC = () => {

    return (
        <AuthProvider>
            <BrowserRouter>
                <ToastContainer autoClose={3000} className={'toast-container'} />
                <RotasRegistradas />
                <GlobalStyled />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
