import { combineReducers } from 'redux';
import auth from './auth/reducer';

const rootReducer = combineReducers({
    auth: auth,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
