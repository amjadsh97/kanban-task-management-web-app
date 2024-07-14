// localStorageMiddleware.ts
import { Middleware } from "redux";

const localStorageMiddleware: Middleware = store => next => action => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(state));
  return result;
};

export default localStorageMiddleware;




// // localStorage.ts
// export const loadState = () => {
//   try {
//     const serializedState = localStorage.getItem('kanbanState');
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.error("Could not load state", err);
//     return undefined;
//   }
// };
//
// export const saveState = (state: any) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     console.log({serializedState})
//     localStorage.setItem('kanbanState', serializedState);
//   } catch (err) {
//     console.error("Could not save state", err);
//   }
// };
