import { TEMA_CLARO, TEMA_DARK } from './types';

export const toggleTheme = () => ({ type: TEMA_DARK });

export const setTheme = (theme: string) => ({ type: TEMA_CLARO, payload: theme });
