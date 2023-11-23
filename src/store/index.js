import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tagSlice from './tagSlice';
import localStorageMiddleware from './middleware';
import noteSlice from './noteSlice';

const rootReducer = combineReducers({
  tag: tagSlice.reducer,
  note: noteSlice.reducer,
});

const loadState = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log('error');
  }
};

const preloadedState = {
  tag: loadState('tag') || tagSlice.reducer(undefined, []),
  note: loadState('note') || noteSlice.reducer(undefined, []),
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

store.subscribe(() => {
  saveState('tag', store.getState().tag);
  saveState('note', store.getState().note);
});
export default store;
