/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

interface UserState {
    token: string | null;
}

interface AuthContextType {
    userState: UserState;
    setUserDispatch: React.Dispatch<any>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// iniciaa o pre Registro de criar um contexto