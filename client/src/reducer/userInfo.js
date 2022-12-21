import { createContext, useReducer } from "react";

export const User = createContext();

const ACTION_TYPES = {
    USER_SIGNIN: "USER_SIGNIN",
    USER_SIGNOUT: "USER_SIGNOUT",
    SAVE_ADDRESS: "SAVE_ADDRESS",
};

const INITIAL_STATE = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    cart: {
        shippingAddress: localStorage.getItem("shippingAddress")
            ? JSON.parse(localStorage.getItem("shippingAddress"))
            : {},
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
    },
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
        case ACTION_TYPES.SAVE_ADDRESS: {
            return { ...state, shippingAddress: action.payload };
        }
        default:
            return state;
    }
};

export function UserProvider(props) {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    const value = { state, dispatch };
    return <User.Provider value={value}>{props.children} </User.Provider>;
}
