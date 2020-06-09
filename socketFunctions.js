import io from 'socket.io-client';
import {PV_API} from './constants';
export const socket = io(PV_API, {
  secure: true,
  // timeout: 10000,
  // jsonp: false,
  transports: [`websocket`],
  // autoConnect: true,
  // agent: `-`,
  // path: `/`, // Whatever yr path is, obvs
  // pfx: `-`,
  // key: token, // Using token-based auth? Try passing it here.
  // passphrase: cookie, // Using cookie auth? Try passing it here.
  // cert: `-`,
  // ca: `-`,
  // ciphers: `-`,
  // rejectUnauthorized: `-`,
  // perMessageDeflate: `-`,
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

export function disconnect(data) {
  //  socket.emit("",data)
  socket.emit('disconnect', data);
}
