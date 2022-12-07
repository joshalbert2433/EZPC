const ACTION_TYPES = {
    CHANGE_INPUT: "CHANGE_INPUT",
    ADD_CATEGORY: "ADD_CATEGORY",
    REMOVE_CATEGORY: "REMOVE_CATEGORY",
    IMAGE_INPUT: "IMAGE_INPUT",
    SET_IMAGE_MAIN: "SET_IMAGE_MAIN",
    RESET: "RESET",
};

export const INITIAL_STATE = {
    name: "",
    description: "",
    category: [],
    image: [],
    image_main: "",
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
        case ACTION_TYPES.IMAGE_INPUT:
            return {
                ...state,
                image: action.payload,
            };
        case ACTION_TYPES.SET_IMAGE_MAIN:
            return {
                ...state,
                image_main: action.payload,
            };
        case ACTION_TYPES.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
