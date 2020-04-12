import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,

  PermissionsAndroid,
  ToolbarAndroid,
  Button,
} from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
import Geolocation from 'react-native-geolocation-service';
import BottomSheet from './Layouts/BottomSheet';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Toolbar from './Layouts/Toolbar';
//import Drawer from './Layouts/Drawer';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCF1Jur9qHYa6q07JWBMyVjQ2DqOlSJ2qc';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const bottomSheetHeight = (1 / 3) * height;

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const TAB_BAR_HEIGHT = 0;
export default class MainPage extends Component {
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
    };

    this.mapView = null;
  }
  async componentDidMount() {
    const hasLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }
  renderContent = () => {
    return <BottomSheet />;
  };
  onMapPress = e => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };
  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <Toolbar />

        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={c => (this.mapView = c)}
          onPress={this.onMapPress}>
          {this.state.coordinates.map((coordinate, index) => (
            <MapView.Marker
              key={`coordinate_${index}`}
              coordinate={coordinate}
            />
          ))}
          {this.state.coordinates.length >= 2 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={this.state.coordinates.slice(1, -1)}
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${
                    params.destination
                  }"`,
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <BottomDrawer
          backgroundColor="#4f69a2"
          containerHeight={bottomSheetHeight}
          offset={TAB_BAR_HEIGHT}>
          {this.renderContent()}
        </BottomDrawer>
      </View>
    );
  }
}
