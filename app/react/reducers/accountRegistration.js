import {
    INPUT_VALUE_CHANGED,
    INPUT_VALUE_ERROR,
} from '../constants/AccountRegistration'

const initialState = {
    error: '',
    errors: {},
    email: '',
    phone: '',
}

export default function accountRegistration(state = initialState, action) {
    let errors;
    switch (action.type) {
        case INPUT_VALUE_CHANGED:
            errors = {... state.errors, [action.field]: void 0};
            return {
                ...state,
                [action.field]: action.value,
                errors,
            };
        case INPUT_VALUE_ERROR:
            errors = {... state.errors, [action.field]: action.error};
            return {
                ...state,
                [action.field]: action.value,
                errors,
            };
        default:
            return state;
    }
}
