import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import { Reducer } from "./Reducer";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    
}

const reducer = combineReducers({root: Reducer});
const persistedReducer = persistReducer(persistConfig,reducer); 

export default persistedReducer;