
const initialState = {
    themeColor: 'red'
};

export const themeReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return state
    }
};
