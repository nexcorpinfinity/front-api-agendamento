import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PersistGate } from 'redux-persist/integration/react';

import NavbarPrincipal from './components/NavbarPrincipal';
import store, { persistor } from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <NavbarPrincipal />
          <ToastContainer autoClose={3000} className="toast-container" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
