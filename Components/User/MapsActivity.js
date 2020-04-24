import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  TouchableOpacity,
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
const LATITUDE = 0.009;
const LONGITUDE = 0.009;
import Config from 'react-native-config';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCWNecG4xgKaW3_RGqgGT5QZnk9knUesCA';
import Sidebar from './Layouts/Sidebar';
import {Drawer} from 'native-base';
import {getCurrentLocation} from '../../Actions/locationAction';
import {connect} from 'react-redux';
const TAB_BAR_HEIGHT = 0;
const {width, height} = Dimensions.get('window');
class MapsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: props.origin.latitude,
      longitude: props.origin.longitude,
      bottomSheetHeight: height / 4,
      routeCoordinates: [],
      distanceTravelled: 0,
      locationName: '',
      originName: props.originName,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
    this.drawer = null;
  }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  renderContent = () => {
    return <BottomSheet navigation={this.props.navigation} />;
  };
  async getLocationName(position) {
    try {
      const {latitude, longitude} = position.coords;
      const key = GOOGLE_MAPS_APIKEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;
      const res = await axios.get(url);
      return res.data.results[2].formatted_address;
    } catch (e) {
      console.log(e.message);
    }
  }
  handleBackButton() {
    BackHandler.exitApp();
  }
  componentDidMount = async () => {
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButton.bind(this),
    // );

    // this.requestLocationPermission();

    Geolocation.getCurrentPosition(
      async position => {
        // console.log(position.coords.latitude);
        const Oname = await this.getLocationName(position);
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          originName: Oname,
        };

        this.props.getCurrentLocation(data);
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );

    const {coordinate} = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
          originName: this.state.originName,
        };

        this.props.getCurrentLocation(newCoordinate);
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
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  getCurrentRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<Sidebar navigation={this.props.navigation} />}
        onClose={() => this.closeDrawer()}>
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getCurrentRegion()}
            style={{...StyleSheet.absoluteFillObject}}>
            {/* <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}>
            <Image
              source={require('../../assets/map-pin.png')}
              style={{height: 40, width: 40}}
            />
            //will be used to show riders on the mapp
            {this.state.coordinates.map((coordinate, index) =>
          <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
        //will be used to show riders on the mapp

        
          </Marker.Animated> */}

            {/* <Marker coordinate={this.getCurrentRegion()} /> */}
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
          <Toolbar
            icon={'bars'}
            notbackAction={true}
            opendrawer={this.openDrawer}
            navigation={this.props.navigation}
          />

          <BottomDrawer
            containerHeight={this.state.bottomSheetHeight}
            offset={TAB_BAR_HEIGHT}
            shadow={true}>
            {this.renderContent()}
          </BottomDrawer>
        </View>
      </Drawer>
    );
  }
}
const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
  error: state.locationData.error,
});
export default connect(
  mapStateToProps,
  {getCurrentLocation},
)(MapsActivity);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
