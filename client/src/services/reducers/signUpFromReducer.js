const ACTION_TYPES = {
	CHANGE_INPUT: "CHANGE_INPUT",
	RESET: "RESET",
	ASSIGN_DATA: "ASSIGN_DATA",
};

export const INITIAL_STATE = {
	email: "",
	password: "",
	confirm_password: "",
};

export const signUpFormReducer = (state, action) => {
	switch (action.type) {
		case ACTION_TYPES.CHANGE_INPUT:
			return {
				...state,
				[action.payload.name]: action.payload.value,
			};
		case ACTION_TYPES.RESET:
			return INITIAL_STATE;
		case ACTION_TYPES.ASSIGN_DATA:
			return action.payload.data;
		default:
			return state;
	}
};
