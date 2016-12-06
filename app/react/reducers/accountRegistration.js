import {
    INPUT_VALUE_CHANGED,
} from '../constants/AccountRegistration'

const initialState = {
    error: '',
    errors: {},
    //email: '',
    //phone: 0,
}

export default function accountRegistration(state = initialState, action) {
    switch (action.type) {
        case INPUT_VALUE_CHANGED:
            return {...state,
                [action.field]: action.value + 1
            };
        default:
            return state;
    }
}
