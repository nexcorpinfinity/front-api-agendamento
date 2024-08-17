import React, { useReducer } from 'react';
import { AuthContext } from './modules/context';
import { initialStateUser } from './modules/initialState';
import { reducer } from './modules/reducer';

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userState, setUserDispatch] = useReducer(reducer, initialStateUser);

    return (
        <AuthContext.Provider value={{ userState, setUserDispatch }}>
            {children}
        </AuthContext.Provider>
    );
};