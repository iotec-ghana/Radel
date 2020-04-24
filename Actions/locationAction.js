import {GET_CURRENT_LOCATION, GET_DESTINATION_LOCATION} from './types';
import Geolocation from '@react-native-community/geolocation';
export const getCurrentLocation = data => {
  return {
    type: GET_CURRENT_LOCATION,
    payload: data,
    
  };
};

export const getDestinationCoordinates = destination => {
  return {
    type: GET_DESTINATION_LOCATION,
    payload: destination,
    //error: '',
  };
};
