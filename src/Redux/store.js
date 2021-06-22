import { createStore } from "redux";
import { persistStore } from 'redux-persist'
import persistedReducer from ".";
import throttle from 'lodash/throttle';
import { loadState, saveState } from "./Modules";

const persistedState = loadState();

const store = createStore(persistedReducer, persistedState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(throttle(() => {
    saveState({
      root: store.getState().root
    });
},[]));

const  persistor = persistStore(store);

export {store, persistor}