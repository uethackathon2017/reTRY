import * as types from '../actions/types';
const initialState = {
    number: 0
};
export default test = (state = initialState, action) => {
    switch (action.type) {
        case 'TEST':
            console.log(action);
            return {
                number: action.content
            };
        default:
            return state;
    }
}

export const getNumberOnlineUser = (state) => {
    console.log("number" + state.number);
    return state.number;
}