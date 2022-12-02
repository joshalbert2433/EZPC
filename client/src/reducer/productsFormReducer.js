const ACTION_TYPES = {
    CHANGE_INPUT: "CHANGE_INPUT",
    ADD_CATEGORY: "ADD_CATEGORY",
    REMOVE_CATEGORY: "REMOVE_CATEGORY",
};

export const INITIAL_STATE = {
    name: "",
    description: "",
    category: "",
};

export const addProductsFormReducer = (state, action) => {
    switch (action.type) {
        case ACTION_TYPES.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        case ACTION_TYPES.ADD_CATEGORY:
            return {
                ...state,
                category: [...state.category, action.payload],
            };
        case ACTION_TYPES.REMOVE_CATEGORY:
            return {
                ...state,
                category: state.category.filter(
                    (value) => value !== action.payload
                ),
            };
        default:
            return state;
    }
};
