import { legacy_createStore as createStore, applyMiddleware, Store } from 'redux';
import { Action } from 'redux';
import { persistStore } from 'redux-persist';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import { ThunkDispatch } from 'redux-thunk';

import persistedReducers from './modules/reduxPersist';
import rootReducer, { RootState } from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware: SagaMiddleware = createSagaMiddleware();

const store: Store<RootState, Action> = createStore(
  persistedReducers(rootReducer),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export default store;

export type AppDispatch = ThunkDispatch<RootState, void, Action>;
