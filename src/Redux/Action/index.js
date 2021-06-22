import { ADD_INFO } from "../Constants";

export const AddInfo = (payload) => (
    {
        type: ADD_INFO,
        payload: payload
    }
);

