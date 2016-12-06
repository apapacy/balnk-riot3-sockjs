import {
    combineReducers
} from 'redux';
import page from './page';
import user from './user';
import accountRegistration from './accountRegistration';

export default combineReducers({
    page,
    user,
    accountRegistration,
});
