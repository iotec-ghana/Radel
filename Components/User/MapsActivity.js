/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
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
  StatusBar,
  Image,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import {PV_API} from '../../constants';
import Geolocation from '@react-native-community/geolocation';
import Toolbar from './Layouts/Toolbar';
import haversine from 'haversine';
import BottomSheet from './Layouts/BottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
import {StackActions} from '@react-navigation/native';
const LATITUDE_DELTA = 0.011;
const LONGITUDE_DELTA = 0.011;
const LATITUDE = 0.009;
const LONGITUDE = 0.009;
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
import Sidebar from './Layouts/Sidebar';
import {Drawer} from 'native-base';
import {getCurrentLocation} from '../../Actions/locationAction';
import {isSignedIn, loginStatus} from '../../Actions/authAction';
import {connect} from 'react-redux';
import {getRiders} from '../../Actions/getAllRidersAction';
import {Toast} from 'native-base';
const TAB_BAR_HEIGHT = 0;
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Feather';

import {useAndroidBackHandler} from 'react-navigation-backhandler';
import io from 'socket.io-client';
import Spinner from 'react-native-loading-spinner-overlay';
class MapsActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: props.origin.latitude,
      longitude: props.origin.longitude,
      bottomSheetHeight: height / 4,
      routeCoordinates: [],
      riders: [],
      distanceTravelled: 0,
      locationName: '',
      showBS: false,
      originName: props.originName,
      bearing: 0,
      speed: 0,
      time: 'N/A',
      prevLatLng: {},
      coordinateRiders: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      coordinateUser: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };
    this.drawer = null;
    this.indx = 0;
  }
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    console.log('unmounted');
  }
  getAllRiders = () => {
    this.socket = io(PV_API, {
      secure: true,
      transports: ['websocket'],
    });

    this.socket.on('riderDetails', det => {
      this.setState({
        riders: this.state.riders.filter(
          rider => rider.riderEmail !== det.riderEmail,
        ),
      });
      this.setState({riders: [...this.state.riders, det]});
      this.props.getRiders(this.state.riders);
      console.log(this.state.riders);
    });
  };

  animateRiderMovement = () => {
    const {coordinateRiders: coordinate} = this.state;
    if (Platform.OS === 'android') {
      if (this.markerRider) {
        {
          this.state.riders.map(riders =>
            this.markerRider._component.animateMarkerToCoordinate(
              {latitude: riders.latitude, longitude: riders.longitude},
              500,
            ),
          );
        }
      }
    } else {
      {
        this.state.riders.map(riders =>
          coordinate
            .timing({latitude: riders.latitude, longitude: riders.longitude})
            .start(),
        );
      }
    }
  };
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
      if (e.message === 'Network Error') {
        this.setState({showBS: false});
        Toast.show({
          text: 'Please check your internet connection',
          buttonText: 'Okay',
          duration: 5000,
        });
      }
    }
  }
  handleBackButton() {
    BackHandler.exitApp();
  }
  // static async getDerivedStateFromProps(props, state) {
  //   // await props.loginStatus();
  //   if (!props.authStatus.isAuthenticated) {
  //     // props.navigation.navigate('Login');
  //     props.navigation.dispatch(StackActions.replace('Login'));
  //   }
  // }
  componentDidMount = async () => {
    await this.props.loginStatus();
    if (!this.props.authStatus.isAuthenticated) {
      //this.props.navigation.navigate("Login");
      this.props.navigation.dispatch(StackActions.replace('Intro'));
    }

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
          speed: position.coords.speed,
        };
        console.log(position);
        this.setState({bearing: position.coords.heading});
        await this.props.getCurrentLocation(data);
        this.setState({showBS: true});
        this.getAllRiders();
        this.animateRiderMovement();
      },
      error => this.setState({error: error.message}),
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );

    const {coordinateRiders: coordinate} = this.state;

    this.watchID = Geolocation.watchPosition(
      async position => {
        const {routeCoordinates, distanceTravelled} = this.state;
        const {latitude, longitude} = position.coords;
        const Oname = await this.getLocationName(position);
        const newCoordinate = {
          latitude,
          longitude,
          originName: Oname,
        };
        await this.props.getCurrentLocation(newCoordinate);
        // this.props.getCurrentLocation(newCoordinate);
        // console.log({newCoordinate});
        try {
          this.map.animateToRegion(this.getCurrentRegion(), 1000 * 2);
        if (Platform.OS === 'android') {
          if (this.markerUser) {
            this.markerUser._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        } catch (error) {
          console.log(error)
        }
        

        this.setState({
          latitude,
          longitude,
          bearing: position.coords.heading,
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
      <View style={{flex: 1}}>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <Sidebar
              navigation={this.props.navigation}
              authdata={this.props.authStatus}
            />
          }>
          <View style={styles.container}>
            {!this.state.showBS ? (
              <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : (
              <MapView
                provider={PROVIDER_GOOGLE}
                showUserLocation
                followUserLocation
                region={this.getCurrentRegion()}
                style={{...StyleSheet.absoluteFillObject}}
                ref={ref => {
                  this.map = ref;
                }}>
                <MapView.Marker.Animated
                  ref={marker => {
                    this.markerUser = marker;
                  }}
                  coordinate={this.getCurrentRegion()}>
                  <Icon
                    name={'navigation-2'}
                    size={24}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                      transform: [{rotate: `${this.state.bearing}deg`}],
                      zIndex: 3,
                    }}
                  />
                  {/* <Image
                  source={require('../../assets/map-pin.png')}
                  style={{height: 40, width: 40}}
                /> */}
                </MapView.Marker.Animated>

                {this.state.riders.map(riders => (
                  <Marker.Animated
                    ref={marker => {
                      this.markerRider = marker;
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: 'contain',
                      transform: [{rotate: `${riders.bearing}deg`}],
                      zIndex: 3,
                    }}
                    coordinate={{
                      latitude: riders.latitude,
                      longitude: riders.longitude,
                    }}>
                    <Image
                      source={require('../../assets/motor.png')}
                      style={{height: 40, width: 40}}
                    />

                    <Marker
                      coordinate={{
                        latitude: riders.latitude,
                        longitude: riders.longitude,
                      }}
                    />
                  </Marker.Animated>
                ))}
              </MapView>
            )}
            <Toolbar
              icon={'align-left'}
              notbackAction={true}
              opendrawer={this.openDrawer}
              navigation={this.props.navigation}
            />
            {this.state.showBS ? (
              <BottomDrawer
                containerHeight={this.state.bottomSheetHeight}
                offset={TAB_BAR_HEIGHT}
                shadow={true}>
                {this.renderContent()}
              </BottomDrawer>
            ) : // <RBSheet
            //   ref={ref => {
            //     this.RBSheet = ref;
            //   }}
            //   height={this.state.bottomSheetHeight}
            //   animationType={'slide'}
            //   duration={650}
            //   minClosingHeight={this.state.bottomSheetHeight}
            //   closeOnPressMask={false}
            //   closeOnPressBack={false}
            //   customStyles={{
            //     container: {},
            //     wrapper: {
            //       backgroundColor: 'transparent',
            //     },
            //   }}>
            //   {this.renderContent()}
            // </RBSheet>
            null}
          </View>
        </Drawer>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
  error: state.locationData.error,
  authStatus: state.auth,
});
export default connect(
  mapStateToProps,
  {getCurrentLocation, getRiders, isSignedIn, loginStatus},
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
