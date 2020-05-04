import {combineReducers} from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer';
import getAllRidersReducer from './getAllRidersReducer';
export default combineReducers({
  auth: authReducer,
  locationData: locationReducer,
  nearby_riders: getAllRidersReducer,
});
