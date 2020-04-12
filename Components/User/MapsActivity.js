import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Toolbar from './Layouts/Toolbar';
import haversine from 'haversine';
import BottomSheet from './Layouts/BottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;
import PolylineDirection from '@react-native-maps/polyline-direction';
const origin = {latitude: 19.363631, longitude: -99.182545};
const destination = {latitude: 19.2932543, longitude: -99.1794758};
const DestLATITUDE = 18.7934829;
const DestLONGITUDE = 98.9867401;
const TAB_BAR_HEIGHT = 0;
const {width, height} = Dimensions.get('window');

export default class MapsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      Destlatitude: DestLATITUDE,
      Destlongitude: DestLONGITUDE,
      bottomSheetHeight: height / 4,
      routeCoordinates: [],
      distanceTravelled: 0,
      locationName: '',
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),

      Destinationcoordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  renderContent = () => {
    return <BottomSheet navigation={this.props.navigation} />;
  };
  async getLocationName() {
    const {latitude, longitude} = this.state;
    const key = 'AIzaSyCF1Jur9qHYa6q07JWBMyVjQ2DqOlSJ2qc';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
    const res = await axios.get(url);
    console.log(res.data);
  }
  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );
    const {coordinate} = this.state;
    //this.getLocationName();
    this.watchID = Geolocation.watchPosition(
      position => {
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };
        console.log({newCoordinate});

        // if (Platform.OS === 'android') {
        //   if (this.marker) {
        //     this.marker._component.animateMarkerToCoordinate(
        //       newCoordinate,
        //       500,
        //     );
        //   }
        // } else {
        coordinate.timing(newCoordinate).start();
        // }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
      },
    );
  }

  //   requestCameraPermission = async () => {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Location Access Permission',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('You can use the camera');
  //       } else {
  //         console.log('Camera permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };
  getCurrentRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  getDestinationReagion = () => ({
    latitude: this.state.Destlatitude,
    longitude: this.state.Destlongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getCurrentRegion()}
          style={{...StyleSheet.absoluteFillObject}}>
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          {/* <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <Image
              source={require('../../assets/map-pin.png')}
              style={{height: 40, width: 40}}
            />
            
          </Marker.Animated> */}

          <Marker coordinate={this.getCurrentRegion()} />
          {/* <Marker coordinate={this.getDestinationReagion()} /> */}
          {/* will be used in DeliveryDestinationMap */}
          {/* <PolylineDirection
            origin={origin}
            destination={destination}
            apiKey={'AIzaSyCF1Jur9qHYa6q07JWBMyVjQ2DqOlSJ2qc'}
            strokeWidth={4}
            strokeColor="#12bc00"
          /> */}
        </MapView>
        <BottomDrawer
          containerHeight={this.state.bottomSheetHeight}
          offset={TAB_BAR_HEIGHT}
          shadow={true}>
          {this.renderContent()}
        </BottomDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
