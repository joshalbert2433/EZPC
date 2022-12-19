import { createContext, useReducer } from "react";

export const User = createContext();

const ACTION_TYPES = {
    USER_SIGNIN: "USER_SIGNIN",
    USER_SIGNOUT: "USER_SIGNOUT",
};

const INITIAL_STATE = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.USER_SIGNIN:
            return { ...state, userInfo: action.payload };
        case ACTION_TYPES.USER_SIGNOUT:
            return {
                ...state,
                userInfo: null,
            };
        default:
            return state;
    }
};

export function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const value = { state, dispatch };
    return <User.Provider value={value}>{props.children} </User.Provider>;
}
