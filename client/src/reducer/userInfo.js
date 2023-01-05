import { createContext, useReducer } from "react";

export const User = createContext();

const ACTION_TYPES = {
	USER_SIGNIN: "USER_SIGNIN",
	USER_SIGNOUT: "USER_SIGNOUT",
	SAVE_SHIPPING_ADDRESS: "SAVE_SHIPPING_ADDRESS",
	ADD_CART_ITEM: "ADD_CART_ITEM",
	CART_CLEAR: "CART_CLEAR",
	CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
	INITIAL_CART_ITEM: "INITIAL_CART_ITEM",
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
				cart: {
					cartItems: [],
					shippingAddress: {},
				},
			};
		case ACTION_TYPES.SAVE_SHIPPING_ADDRESS: {
			return { ...state, shippingAddress: action.payload };
		}
		case ACTION_TYPES.INITIAL_CART_ITEM: {
			return { ...state, cart: { cartItems: action.payload } };
		}
		case ACTION_TYPES.ADD_CART_ITEM: {
			console.log(state.cart.cartItems.quantity);
			const newItem = {
				...action.payload,
			};

			// * CHECK THE PAYLOAD DATA IF EXIST
			const existItem = state.cart.cartItems.find(
				(item) => item._id === newItem._id
			);

			// * IF IT HAS NO CART ITEM DATA, RETURN NEW ITEM, ELSE RETURN EXISTING DATA AND UPDATE ONLY THE QUANTITY
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						item._id === existItem._id
							? {
									...newItem,
									quantity:
										parseInt(existItem.quantity) +
										parseInt(action.payload.quantity),
							  }
							: item
				  )
				: [...state.cart.cartItems, newItem];

			localStorage.setItem("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case ACTION_TYPES.CART_REMOVE_ITEM: {
			const cartItems = state.cart.cartItems.filter(
				(item) => item._id !== action.payload._id
			);
			localStorage.setItem("cartItems", JSON.stringify(cartItems));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		case ACTION_TYPES.CART_CLEAR:
			return { ...state, cart: { ...state.cart, cartItems: [] } };
		default:
			return state;
	}
};

export function UserProvider(props) {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const value = { state, dispatch };
	return <User.Provider value={value}>{props.children} </User.Provider>;
}
