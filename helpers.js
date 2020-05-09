export function regionFrom(lat, lon, accuracy) {
  const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
  const circumference = (40075 / 360) * 1000;

  const latDelta = accuracy * (1 / (Math.cos(lat) * circumference));
  const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

  return {
    latitude: lat,
    longitude: lon,
    latitudeDelta: Math.max(0, latDelta),
    longitudeDelta: Math.max(0, lonDelta),
  };
}

export function getLatLonDiffInMeters(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d * 1000;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
// _slow = () => {
//   Magnetometer.setUpdateInterval(1000);
// };
// subscribe = async () => {
//   this._slow();
//   this._subscription = Magnetometer.addListener((result) => {
//     console.log(this._angle(result));
//     this.setState({ bearing: this._angle(result) });
//   });
// };

// _unsubscribe = () => {
//   this._subscription && this._subscription.remove();
//   this._subscription = null;
// };

// _angle = (magnetometer) => {
//   let angle =0;
//   if (magnetometer) {
//     let { x, y, z } = magnetometer;
    

//     if (Math.atan2(y, x) >= 0) {
//       angle = Math.atan2(y, x) * (180 / Math.PI);
//     } else {
//       angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
//     }
//   }
//   //console.log(this.round(angle))

//   return angle.toFixed(0);
// };

// _direction = (degree) => {
//   if (degree >= 22.5 && degree < 67.5) {
//     return "NE";
//   } else if (degree >= 67.5 && degree < 112.5) {
//     return "E";
//   } else if (degree >= 112.5 && degree < 157.5) {
//     return "SE";
//   } else if (degree >= 157.5 && degree < 202.5) {
//     return "S";
//   } else if (degree >= 202.5 && degree < 247.5) {
//     return "SW";
//   } else if (degree >= 247.5 && degree < 292.5) {
//     return "W";
//   } else if (degree >= 292.5 && degree < 337.5) {
//     return "NW";
//   } else {
//     return "N";
//   }
// };

// // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
// _degree = (magnetometer) => {
//   return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
// };
