import { ADD_INFO } from "../Constants";

const initialState = {
        id: 1,
        name: "Sohel",
        avtar: "",
        gameType: "",
        roomName: ""

    };

export const Reducer = (state = initialState, { type, payload }) => {
    switch(type) {
        case ADD_INFO: {
            let temp = [...state];
            temp = [ ...temp, { id: temp.length + 1, name: payload, listName: [] } ]
            return temp
        }
        default: {
            return state;
        }
    }
};