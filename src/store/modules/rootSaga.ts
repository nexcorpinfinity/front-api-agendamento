import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects';
import authSaga from './auth/sagas';

export default function* rootSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
    yield all([fork(authSaga)]);
}
