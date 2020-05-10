import io from 'socket.io-client';
import {PV_API} from './constants';
const socket = io(PV_API, {
  secure: true,
  transports: ['websocket'],
});
export function establishConnectionToSocket(userData) {
  socket.emit('new-user', userData);
}

export function getNearbyRiders() {

  var riders = [];
 socket.on('online-riders', riderData => {
    
   // riders.filter(rider => rider.riderid !== riderData.riderid);
   // riders.push(riderData);
   //con sole.log(...riderData)
    
   
  });
 // riders.push(test)
 //console.log(riders)  
  return riders;
  
}
export function requestRide(SelectedRiderDetails) {
  socket.emit('request-ride', SelectedRiderDetails);
}

export function listenForRiderDecision() {
  let decision;
  socket.on('rider-decision', riderdecision => {
    decision = riderdecision;
  });
  return decision;
}
export function trackRider() {
  let tracking;
  socket.on('tracking-data', trackingData => {
    tracking = trackingData;
  });
  return tracking;
}
