/* eslint-disable no-undef */
import { AxiosResponse } from 'axios';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { call, put, all, takeLatest, fork, AllEffect, ForkEffect } from 'redux-saga/effects';

import * as actions from './actions';
import AxiosRequest from '../../../services/axios/AxiosRequest';
import * as types from '../types';

interface LoginRequestAction {
  type: typeof types.LOGIN_REQUEST_REQUEST;
  payload: {
    email: string;
    password: string;
    stay_connected: boolean;
  };
}

interface PersistRehydrateAction {
  type: typeof types.PERSIST_REHYDRATE;
  payload: {
    auth: {
      token: string;
    };
  };
}

interface UpdateProfileRequestAction {
  type: typeof types.PROFILE_UPDATE_REQUEST;
  payload: {
    id: string;
    nome: string;
    email: string;
    password?: string;
  };
}

function* loginRequest({ payload }: LoginRequestAction) {
  try {
    const response: AxiosResponse = yield call(AxiosRequest.post, '/auth', payload);
    yield put(actions.loginSuccess({ ...response.data.resource }));
    toast.success('Login efetuado com sucesso!');

    AxiosRequest.defaults.headers.Authorization = `Bearer ${response.data.resource.token}`;
  } catch (e) {
    console.log(e);
    yield put(actions.loginFailure({ error: 'Usuário ou senha inválidos.' }));
    toast.error('Usuário ou senha inválidos.');
  }
}

// eslint-disable-next-line require-yield
function* persistRehydrate({ payload }: PersistRehydrateAction) {
  const token = get(payload, 'auth.token');
  if (!token) return;

  AxiosRequest.defaults.headers.Authorization = `Bearer ${token}`;
}

function* updateProfileRequest({ payload }: UpdateProfileRequestAction) {
  const { id, nome, email, password } = payload;

  try {
    if (id) {
      yield call(AxiosRequest.put, '/users/', {
        nome,
        email,
        password: password || undefined,
      });
      toast.success('Seu Perfil foi atualizado com sucesso!');
      yield put(actions.updateSuccess());
    }
  } catch (err) {
    const errors = get(err, 'response.data.errors', []);
    // const status = get(err, "response.status", 0);

    if (errors.length > 0) {
      errors.forEach((error: string) => toast.error(error));
    } else {
      toast.error('Ocorreu um erro ao atualizar o perfil, tente novamente.');
    }
    yield put(
      actions.updateFailure({
        error: 'Ocorreu um erro ao atualizar o perfil, tente novamente.',
      }),
    );
  }
}

function* watchLoginRequest() {
  yield takeLatest(types.LOGIN_REQUEST_REQUEST, loginRequest);
}

function* watchPersistRehydrate() {
  yield takeLatest(types.PERSIST_REHYDRATE, persistRehydrate);
}

function* watchUpdateProfileRequest() {
  yield takeLatest(types.PROFILE_UPDATE_REQUEST, updateProfileRequest);
}

export default function* authSaga(): Generator<AllEffect<ForkEffect<void>>, void, unknown> {
  yield all([
    fork(watchLoginRequest),
    fork(watchPersistRehydrate),
    fork(watchUpdateProfileRequest),
  ]);
}
