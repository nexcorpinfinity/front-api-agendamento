import { combineReducers } from 'redux';

import auth from './auth/reducer';
import themeReducer from './theme/reducer';

const rootReducer = combineReducers({
  auth: auth,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
