import {GET_CURRENT_LOCATION, GET_DESTINATION_LOCATION} from './types';

export  const  getCurrentLocation = data => {
//  console.log(JSON.stringify(data))
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
