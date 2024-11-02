import { Reducer } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    user: {
        id: string | null;
        nome: string | null;
        email: string | null;
        permission: string | null;
    };
    isLoading: boolean;
}

interface RootState {
    auth: AuthState;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    theme: any;
}

type PersistedState = {
    _persist: {
        version: number;
        rehydrated: boolean;
    };
} & RootState;

const persistConfig: PersistConfig<RootState> = {
    key: 'token-saas',
    storage,
    whitelist: ['auth', 'theme'],
};

const createPersistedReducer = (reducers: Reducer<RootState>): Reducer<PersistedState> => {
    const persistedReducer = persistReducer<RootState>(persistConfig, reducers);
    return persistedReducer;
};

export default createPersistedReducer;
