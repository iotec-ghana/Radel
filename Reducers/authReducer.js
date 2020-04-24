import {
  AUTHENTICATION_STATUS,
  SIGN_IN,
  SIGN_OUT,
  REGISTER,
} from '../Actions/types';
import AsyncStorage from '@react-native-community/async-storage';

const read = async () => {
  try {
    const value = await AsyncStorage.getItem('authdata');
    if (value == null) {
      const authStatus = {
        isAuthenticated: false,
        user: {},
      };
      const data = await AsyncStorage.setItem(
        'authdata',
        JSON.stringify(authStatus),
      );
      return JSON.parse(data);
    }
  } catch (e) {
    console.log(e);
  }
};

const initialState = read();

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        error: action.payload,
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
        isAuthenticated: true,
        error: action.payload,
      };

    default:
      return state;
  }
}
