/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-lone-blocks */
import React, {Component} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  Animated,
  Image,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import Expo from 'expo';
import {PV_API} from '../../constants';
import Toolbar from './Layouts/Toolbar';
import haversine from 'haversine';
import BottomSheetMain from './Layouts/MainMapBottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
import {StackActions} from '@react-navigation/native';
const LATITUDE_DELTA = 0.013;
const LONGITUDE_DELTA = 0.013;
const LATITUDE = 0.009;
const LONGITUDE = 0.009;
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
import UserMarker from './Layouts/UserMarker';
import Sidebar from './Layouts/Sidebar';
import {Drawer} from 'native-base';
import {getCurrentLocation} from '../../Actions/locationAction';
import {isSignedIn, loginStatus} from '../../Actions/authAction';
import {connect} from 'react-redux';
import {getRiders} from '../../Actions/getAllRidersAction';
import {Toast} from 'native-base';
const TAB_BAR_HEIGHT = -20;
const {width, height} = Dimensions.get('window');
import {Ionicons} from '@expo/vector-icons';
import {
  establishConnectionToSocket,
  getNearbyRiders,
  disconnect,
  socket,
} from '../../socketFunctions';
import * as Analytics from 'expo-firebase-analytics';
import * as Location from 'expo-location';
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
      magnetometer: null,
      time: 'N/A',
      onRegionChange: true,
      prevLatLng: {},
      coordinateRiders: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      coordinateUser: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
    };
    this.drawer = null;
  }

  round(n) {
    if (!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  componentWillUnmount() {
    disconnect({userid: 5, user: true});
    //this._unsubscribe();
    if (this.watchID) {
      this.watchID.remove();
    }
    if (this.watchHeading) {
      this.watchHeading.remove();
    }
    // Location.clearWatch(this.watchID);

    // console.log("unmounted");
  }
  UNSAFE_componentWillMount() {
    this.animatedValue = new Animated.Value(50);
  }
  removeDisconnectedRiderFromMap = () => {
    socket.on('remove-rider-from map', data => {
      this.setState({
        riders: this.state.riders.filter(
          rider => rider.riderid !== data.riderid,
        ),
      });
      this.props.getRiders(this.state.riders);
    });
  };
  getAllRiders = () => {
    const userData = {
      userid: this.props.authStatus.user.id,
    };
    establishConnectionToSocket(userData);
    socket.on('online-riders', riderData => {
      this.setState({
        riders: this.state.riders.filter(
          rider => rider.riderid !== riderData.riderid,
        ),
      });
      //console.log()
      this.setState({riders: [...this.state.riders, riderData]});
      this.props.getRiders(this.state.riders);
      console.log(JSON.stringify(this.state.riders[0]));
    });
  };

  componentDidMount = async () => {
    await this.props.loginStatus();
    if (!this.props.authStatus.isAuthenticated) {
      this.props.navigation.dispatch(StackActions.replace('Intro'));
    }
    //await Analytics.setCurrentScreen('MapsActivity', MapsActivity);

    let {status} = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }

    let pos = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    }).catch(error=>alert(error.message))     

    // alert(pos)
    const Oname = await this.getLocationName(pos);
    const data = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      originName: Oname,
      speed: pos.coords.speed,
    };

    await this.props.getCurrentLocation(data);
    // this.map.animateToCoordinate(this.getCurrentRegion(), 5000);
    this.setState({showBS: true});
    this.getAllRiders();
    this.removeDisconnectedRiderFromMap();
    this.animateRiderMovement();
    this.watchHeading = await Location.watchHeadingAsync(heading => {
      this.setState({bearing: heading.magHeading.toFixed(2)});
      // console.log(heading.trueHeading.toFixed(0));
    });

    this.watchID = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 1000,
      },
      async position => {
        const {latitude, longitude} = position.coords;
        //const Oname = await this.getLocationName(position);
        const newCoordinate = {
          latitude,
          longitude,
          originName: Oname,
        };
        await this.props.getCurrentLocation(newCoordinate);

        const duration = 100;
        this.state.coordinateUser.timing({newCoordinate, duration}).start();

        this.setState({
          latitude,
          longitude,
          bearing: position.coords.heading,
        });
      },
      error => console.log(error),
    );
  };

  animateRiderMovement = () => {
    const duration = 100;
    {
      this.state.riders.map(riders =>
        this.state.coordinateRiders
          .timing({
            latitude: riders.latitude,
            longitude: riders.longitude,
            duration,
          })
          .start(),
      );
    }
  };
  renderContent = () => {
    return <BottomSheetMain navigation={this.props.navigation} />;
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
  reCenter() {
    this.map.animateToRegion(this.getCurrentRegion(), 1000);
    // this.map.animateToViewingAngle(20,1000)
    this.setState({onRegionChange: false});
  }
  calcDistance = newLatLng => {
    const {prevLatLng} = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    // const interpolateRotation = this.animatedValue.interpolate({
    //   inputRange:[0,1],
    //   outputRange:['0deg',`${this.state.bearing}deg`]
    // })
    // const animatedStyle={
    //   transform:[{rotate:interpolateRotation}]
    // }
    const {latitude, longitude, riders} = this.state;
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
          {/* {!this.state.showBS ? (
              <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
              />
            ) : ( */}
            <MapView   
              ref={ref => {
                this.map = ref;
              }}
              provider={PROVIDER_GOOGLE}
              showUserLocation={true}   
              showsMyLocationButton={true}
              // scrollEnabled
              loadingEnabled
              onMapReady={ready => {
                this.map.animateToCoordinate(this.getCurrentRegion(), 2000);
              }}
              onRegionChangeComplete={changed => {
                const currentregion = this.getCurrentRegion();

                if (
                  currentregion.latitude.toFixed(3) ==
                    changed.latitude.toFixed(3) &&
                  currentregion.longitude.toFixed(3) ==
                    changed.longitude.toFixed(3)
                ) {
                  this.setState({onRegionChange: false});
                } else {
                  this.setState({onRegionChange: true});
                }
              }}
              initialRegion={this.getCurrentRegion()}
              style={{...StyleSheet.absoluteFillObject}}>
              <MapView.Marker.Animated
                tracksViewChanges={false}
                ref={marker => {
                  this.markerUser = marker;
                }}
                style={
                  {
                    // transform: [
                    //   {
                    //     rotate:
                    //       this.state.bearing === undefined
                    //         ? '0deg'
                    //         : `${this.state.bearing}deg`,
                    //   },
                    // ],
                  }
                }
                coordinate={{latitude: latitude, longitude: longitude}}>
                <UserMarker />
              </MapView.Marker.Animated>

              {riders.map(riders => (
                <Marker.Animated
                  tracksViewChanges={false}
                  ref={marker => {
                    this.markerRider = marker;
                  }}
                  coordinate={{
                    latitude: riders.latitude,
                    longitude: riders.longitude,
                  }}>
                  <Image
                    source={require('../../assets/motor.png')}
                    style={{height: 40, width: 40}}
                  />
                </Marker.Animated>
              ))}
            </MapView>
 {/* )} */}
            <Toolbar
              icon={'menu'}
              notbackAction={true}
              opendrawer={this.openDrawer}
              navigation={this.props.navigation}
            />
            {this.state.onRegionChange ? (
              <TouchableOpacity
                onPress={() => {
                  this.reCenter();
                }}
                style={{
                  position: 'absolute',
                  bottom: height / 4 + 40,
                  right: 15,
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 70,
                  elevation: 94,
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  Re-center
                </Text>
              </TouchableOpacity>
            ) : null}
            {this.state.showBS ? (
              <BottomDrawer
                // onCollapsed={collapse => this.setState({showtopcard: true})}
                // onExpanded={ex => {
                //   this.setState({showtopcard: false});
                // }}
                containerHeight={this.state.bottomSheetHeight}
                offset={TAB_BAR_HEIGHT}
                shadow={true}>
                {this.renderContent()}
              </BottomDrawer>
            ) : null}
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
