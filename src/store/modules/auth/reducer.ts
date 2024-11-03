// import { AnyAction } from 'redux';
import * as types from '../types';

export interface User {
    id?: string;
    nome?: string;
    email?: string;
    login?: string;
    permission?: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    token: string | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    isLoading: boolean;
}

export interface RootState {
    auth: AuthState;
}
const initialState: AuthState = {
    isLoggedIn: false,
    token: null,
    user: {},
    isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export default function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case types.LOGIN_REQUEST_SUCCESS: {
            return {
                ...state,
                isLoggedIn: true,
                token: action.payload.token,
                user: action.payload.user,
                isLoading: false,
            };
        }

        case types.LOGIN_REQUEST_FAILURE: {
            return {
                ...initialState,
                isLoading: false,
            };
        }

        case types.LOGIN_REQUEST_REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case types.PROFILE_UPDATE_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }

        case types.PROFILE_UPDATE_REQUEST: {
            return {
                ...state,
                isLoading: true,
                user: action.payload,
            };
        }

        case types.PROFILE_UPDATE_FAILURE: {
            return {
                ...state,
                isLoading: false,
            };
        }

        default: {
            return state;
        }
    }
}
