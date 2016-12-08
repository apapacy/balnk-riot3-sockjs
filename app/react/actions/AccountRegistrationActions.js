import {
    INPUT_VALUE_CHANGED,
    INPUT_VALUE_ERROR
} from '../constants/AccountRegistration';
import {postJson} from '../util';

export function inputValueChanged(field, value) {
    const error = errorMessage(field, value);
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

export const validateOnServer = (field, value) =>
    dispatch => {
        postJson('/validation/field', {field, value}).then(
        data => dispatch({
            type: INPUT_VALUE_CHANGED,
            field,
            value,
        }),
        data => dispatch({
            type: INPUT_VALUE_ERROR,
            field,
            value,
            error: data.error,
        })
      );
    };

function errorMessage(field, value) {
    switch (field) {
        case 'email':
            if (String(value).search(/^[^@]+@[^@]+\.[^@]+$/) === -1) {
                return 'mailformed email address';
            }
        default:
            return void 0;
    }
}
