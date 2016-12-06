import {
  INPUT_VALUE_CHANGED
} from '../constants/AccountRegistration'

export function inputValueChanged(field, value) {
  return {
      type: INPUT_VALUE_CHANGED,
      field,
      value,
  };
}
