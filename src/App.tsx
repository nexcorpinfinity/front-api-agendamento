/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import RotasRegistradas from './Routers/RotasRegistradas';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ContainerApp, GlobalStyled } from './styles/GlobalStyled';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider, useSelector } from 'react-redux';
import store, { persistor } from './store';
import { jwtDecode } from 'jwt-decode';
import { Decoded } from './Routers/RotaPrivada';
import NavbarAdmin from './components/NavbarAdmin';
import NavbarComercio from './components/NavbarComercio';
import NavbarHome from './components/NavbarHome';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <GlobalStyled />
                    <Navbar />
                    <ToastContainer autoClose={3000} className={'toast-container'} />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;

const Navbar: React.FC = () => {
    const token = useSelector((state: any) => state.auth.token);

    if(token === null){
        return (
            <>
                <NavbarHome />
                <RotasRegistradas />
            </>
        );
    }

    const decoded: Decoded = jwtDecode(token);

    const permission = decoded.permission;

    console.log(permission);

    return (
        <>
            {permission === 'admin' ? (

                <ContainerApp>
                    <NavbarAdmin />
                    <RotasRegistradas />
                </ContainerApp>
            ) : (
                permission === 'costumer' ? (

                    <ContainerApp>
                        <NavbarComercio />
                        <RotasRegistradas />
                    </ContainerApp>
                ) : (
                    <>
                        {/* <NavbarHome /> */}
                        <RotasRegistradas />
                    </>
                )
            )}
        </>
    );
};