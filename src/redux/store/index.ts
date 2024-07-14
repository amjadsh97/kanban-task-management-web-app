// @ts-ignore
import {applyMiddleware, createStore} from 'redux';
import reducer from '../reducer';
import localStorageMiddleware from "../../localStorage";

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : undefined;

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(localStorageMiddleware)
);

export type RootState = ReturnType<typeof store.getState>;

export default store;
