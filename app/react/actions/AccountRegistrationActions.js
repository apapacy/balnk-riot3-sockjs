import {
    INPUT_VALUE_CHANGED,
    INPUT_VALUE_ERROR
} from '../constants/AccountRegistration';

export function inputValueChanged(field, value) {
    const error = errorMessage(field, value);
    console.log(error)
    if (!error) {
        return {
            type: INPUT_VALUE_CHANGED,
            field,
            value,
        };
    } else {
        return {
            type: INPUT_VALUE_ERROR,
            field,
            value,
            error,
        };
    }
}

function errorMessage(field, value) {
    switch (field) {
        case 'email':
            if (String(value).search(/[^@]@[^@]/) === -1) {
                return 'mailformed email address';
            }
        default:
            return void 0;
    }
}
