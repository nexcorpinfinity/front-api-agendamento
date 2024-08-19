import { TEMA_CLARO, TEMA_DARK } from './types';

export const TOGGLE_THEME = 'TOGGLE_THEME';

export const toggleTheme = () => ({ type: TEMA_DARK });

export const setTheme = (theme: string) => ({ type: TEMA_CLARO, payload: theme });