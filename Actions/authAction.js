import {SIGN_IN, SIGN_OUT, REGISTER} from './types';
import axios from 'axios';
import {BASE_URL} from '../constants';
import AsyncStorage from '@react-native-community/async-storage';

export const isSignedIn = (data, navigation) => async dispatch => {
  try {
    //console.log(data);
    const response = await axios.post(BASE_URL + '/login/', data);
    const authData = {
      isAuthenticated: true,
      user: response.data,
    };

    await AsyncStorage.setItem('authdata', JSON.stringify(authData));

    dispatch({
      type: SIGN_IN,
      payload: response.data.user,
    });
    navigation.navigate('Main');
  } catch (e) {
    console.log(e);
    dispatch({
      type: SIGN_IN,
      payload: 'Your email or password is incorrect. Please try again',
    });
  }
};

export const isSignedOut = navigation => async dispatch => {
  try {
    const t = await AsyncStorage.getItem('authdata');

    // set header authorization token
    // const config = {
    //   headers: {Authorization: `Bearer ${t.token}`},
    // };
    // const response = await axios.post(
    //   BASE_URL + 'users/me/logout',
    //   t.user,
    //   config,
    // );

    await AsyncStorage.removeItem('authdata');

    dispatch({
      type: SIGN_OUT,
    });

    navigation.navigate('Home');
  } catch (e) {}
};

export const RegisterUser = (payload, navigation) => async dispatch => {
  try {
    const response = await axios.post(BASE_URL + '/register/', payload);
    const authData = {
      isAuthenticated: true,
      user: response.data,
    };

    await AsyncStorage.setItem('authdata', JSON.stringify(authData));

    dispatch({
      type: REGISTER,
      payload: response.data.user,
    });
    navigation.navigate('PhoneVerificationActivity');
  } catch (e) {
    console.log(e);
    dispatch({
      type: REGISTER,
      payload: 'email already exist',
    });
  }
};
