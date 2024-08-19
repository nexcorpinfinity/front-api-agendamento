import React from 'react';

import RotasRegistradas from './Routers/RotasRegistradas';

import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalStyled } from './styles/GlobalStyled';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <RotasRegistradas />
                    <ToastContainer autoClose={3000} className={'toast-container'} />
                    <GlobalStyled />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};

export default App;
