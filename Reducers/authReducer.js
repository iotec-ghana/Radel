import {
  AUTHENTICATION_STATUS,
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
  CHECK_LOGIN_STATUS,
} from '../Actions/types';
import AsyncStorage from '@react-native-community/async-storage';

// const read = async () => {
//   var userdata = null;
//   try {
//     const value = await AsyncStorage.getItem('authdata');
//     if (value === null) {
//       const authStatus = {
//         isAuthenticated: false,
//         user: null,
//       };
//       await AsyncStorage.setItem('authdata', JSON.stringify(authStatus));
//       userdata = await AsyncStorage.getItem('authdata');
//     } else {
//       userdata = await AsyncStorage.getItem('authdata');
//       //console.log(JSON.parse(data));
//       return userdata;
//     }
//   } catch (e) {
//     console.log(e);
//   }
//   //console.log(userdata)
//   return userdata;
// };

const initialState = {
  error2: '',
  error: '',
  isAuthenticated: false,
  user: null,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        error: action.error,
        user: action.payload.user,
      };
    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        token: '',
      };

    case REGISTER:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        error2: action.error2,
        user: action.payload.user,
      };
    case CHECK_LOGIN_STATUS:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
      };
    default:
      // console.log(state);

      return state;
  }
}
