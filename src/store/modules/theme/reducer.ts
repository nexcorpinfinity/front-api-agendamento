import { Action } from 'redux';
import { TEMA_CLARO, TEMA_DARK } from './types';

const initialState = {
    theme: false,
};

export default function themeReducer(state = initialState, action: Action & { payload?: string }) {
    switch (action.type) {
    case TEMA_DARK:
        return {
            ...state,
            theme: state.theme === false ? true : false,
        };
    case TEMA_CLARO:
        return {
            ...state,
            theme: action.payload || false,
        };
    default:
        return state;
    }
}

