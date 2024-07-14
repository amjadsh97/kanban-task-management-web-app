// @ts-ignore
import {applyMiddleware, createStore} from 'redux';
import reducer from '../reducer';
import localStorageMiddleware from "../../localStorage";
import {setInitialState} from "../actions";

const delayMiddleware = (store: any) => (next: any) => (action: any) => {
  // Add a delay of 1 second (1000 milliseconds)
  setTimeout(() => {
    next(action);
  }, 1000);
};

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState') as string)
  : undefined;

const loadInitialStateWithDelay = (dispatch: any) => {
  setTimeout(() => {
    const persistedState = localStorage.getItem('reduxState')
      ? JSON.parse(localStorage.getItem('reduxState') as string)
      : undefined;

    dispatch(setInitialState(persistedState || {}));
  }, 1000); // 1-second delay
};

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(localStorageMiddleware)
);

loadInitialStateWithDelay(store.dispatch);


export type RootState = ReturnType<typeof store.getState>;

export default store;
