import {
  GET_NEARBY_RIDERS,
  DELETE_DUPLICATE_RIDER_DETAILS,
} from '../Actions/types';
import AsyncStorage from '@react-native-community/async-storage';
// this.setState({
//   riders: this.state.riders.filter(
//     rider => rider.riderEmail !== det.riderEmail,
//   ),
// });
// this.setState({riders: [...this.state.riders, det]});
// console.log(this.state.riders);
const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_NEARBY_RIDERS:
      //console.log(action.payload);
      return {
        ...state,
        nearby: [...action.payload],
      };

    case DELETE_DUPLICATE_RIDER_DETAILS:
      return {
        nearby: state.nearby.filter(
          rider => rider.riderEmail !== action.payload.riderEmail,
        ),
      };
    default:
      return state;
  }
}
