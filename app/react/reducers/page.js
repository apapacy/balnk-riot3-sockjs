import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAIL,
  SET_YEAR,
} from '../constants/Page'

const initialState = {
  year: 2018,
  photos: [],
  fetching: false,
  error: ''
}

export default function page(state = initialState, action) {

  switch (action.type) {

    case	SET_YEAR:
      return	{	...state,	year:	action.payload	}

    case GET_PHOTOS_REQUEST:
      return { ...state, year: action.payload, fetching: true, error: '' }

    case GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.payload, fetching: false, error: '' }

    case GET_PHOTOS_FAIL:
      return { ...state, error: action.payload.message, fetching: false }

    default:
      return state;
  }

}
