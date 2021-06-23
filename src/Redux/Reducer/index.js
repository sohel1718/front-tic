import { ADD_INFO } from "../Constants";

const initialState = {};

export const Reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_INFO: {
            return payload
        }
        default: {
            return state;
        }
    }
};