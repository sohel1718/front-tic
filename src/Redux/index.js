import { combineReducers } from "redux";
import { Reducer } from "./Reducer";

const reducer = combineReducers({root: Reducer});

export default reducer;