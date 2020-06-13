/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getLatLonDiffInMeters} from '../../helpers';
import haversine from 'haversine';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
  Linking,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {connect} from 'react-redux';
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from '../../Actions/locationAction';
import {takeSnapshotAsync} from 'expo';
import axios from 'axios';
import {getSelectedRider} from '../../Actions/SelectRiderAction';
import {isSignedIn} from '../../Actions/authAction';
import {BASE_URL, PV_API} from '../../constants';
const LATITUDE_DELTA = 0.9;
const LONGITUDE_DELTA = 0.9;
const LATITUDE = 0.009;
const LONGITUDE = 0.009;
import SuggestedRidersBottomSheet from './Layouts/SuggestedRidersBottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
const {width, height} = Dimensions.get('window');
const TAB_BAR_HEIGHT = -6;
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
import {getRiders} from '../../Actions/getAllRidersAction';
import io from 'socket.io-client';
import {requestRide, socket} from '../../socketFunctions';
import {StackActions} from '@react-navigation/native';
import {captureRef} from 'react-native-view-shot';
//addy.substr(0, addy.indexOf(','));

class DeliveryDestinationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentloclat: props.origin.latitude,
      currentloclong: props.origin.longitude,
      Destlatitude: props.destination.latitude,
      Destlongitude: props.destination.longitude,
      distance: 0,
      duration: 0,
      price: 0,
      showtopcard: true,
      processing: false,
      buttonDisabled: true,
      loadingPrice: true,
      found: false,
      loadingLayout: false,
      requestOnce: false,
      requestAccepted: false,
      riderDetails: null,
      coordinateRiders: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      originName: this.props.originName.substr(
        0,
        this.props.originName.indexOf(','),
      ),
      destinationName: this.props.destinationName.substr(
        0,
        this.props.destinationName.indexOf(','),
      ),
    };

    this.mapView = null;
  }

  async componentDidMount() {
    // this.RBSheet.open()
    try {
      // const result = await captureRef(this.mapView , {
      //   result: 'tmpfile',
      //   height: 200,
      //   width: 150,
      //   quality: 0,
      //   format: 'jpg',
      // });
      // console.log(result + "dfgddgd")

      const userid = this.props.authStatus.id;
      socket.on('rider-decision-' + userid, riderdecision => {
        if (riderdecision.isAvailable) {
          this.setState({
            loadingLayout: false,
            requestAccepted: riderdecision.isAvailable,
            found: true,
            riderDetails: riderdecision,
          });
          socket.emit('customer-movement-' + userid);
        } else {
          //  alert('Rider declined your request');
        }
      });
      // console.log(this.props.authStatus);
    } catch (error) {
      console.log(error);
    }
  }
  reqRide = async () => {
    //fetch driver details

    const payload = {
      latitude: this.state.currentloclat,
      longitude: this.state.currentloclong,
      userid: this.props.authStatus.id,
      name:
        this.props.authStatus.first_name +
        ' ' +
        this.props.authStatus.last_name,
      destination: this.state.destinationName,
      DestinationCoordinates: {
        latitude: this.state.Destlatitude,
        longitude: this.state.Destlongitude,
      },
      pickup: this.state.originName,
      riderid: this.props.selected.riderid,
    };
    //console.log(payloa d);

    if (!this.state.requestOnce) {
      await this.sendPushNotificationToRider();
      requestRide(payload);
      this.setState({requestOnce: true});
    }

    // console.log('done');
  };

  sendPushNotificationToRider = async () => {
    console.log(this.props.selected.NotificationToken);
    const message = {
      to: this.props.selected.NotificationToken,
      sound: 'default',
      title: 'New ride request',
      body: `from ${this.props.authStatus.first_name +
        ' ' +
        this.props.authStatus.last_name}`,
      data: {data: 'anything  here'},
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  DriverDetailsLayout = () => {
    //(this.mapView
    //alert(this.state.riderDetails)
    if (this.state.riderDetails !== undefined) {
      const {
        first_name,
        last_name,
        email,
        phone_number,
      } = this.state.riderDetails;

      return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15}}>
            WE HAVE FOUND YOU A RIDER
          </Text>
          {/* <Text
          style={{
            fontWeight: 'bold',
            color: '#e7564c',
            fontSize: 14,
            marginTop: 10,
          }}>
          Rider will pickup your items in {'02:45'}
        </Text> */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.dialCall(phone_number)}
              style={{
                padding: 20,
                backgroundColor: '#fafafa',
                borderRadius: 40,
                marginRight: 30,
              }}>
              <Icon name="phone" size={24} color="#000" style={{margin: 2}} />
            </TouchableOpacity>

            <View style={{}}>
              <Image
                source={require('../../assets/deedat.jpg')}
                style={{height: 100, width: 100, borderRadius: 100}}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.dialCall(phone_number)}
              style={{
                padding: 20,
                backgroundColor: '#fafafa',
                borderRadius: 40,
                marginLeft: 30,
              }}>
              <Icon name="phone" size={24} color="#000" style={{}} />
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 16,
              marginTop: 10,
            }}>
            {first_name} {last_name}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 16,
              marginTop: 20,
            }}>
            {'GR-34-18'} - {'Honda'}
          </Text>
        </View>
      );
    }
  };
  loadingLayout = () => {
    this.reqRide();
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={require('../../assets/spinner.gif')}
          style={{height: 100, width: 100}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          WE ARE LOOKING FOR THE CLOSEST RIDER FOR YOU
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 20}}>
          Your rider will be there soon
        </Text>
      </View>
    );
  };
  calcDistance = (riderlocation, userlocation) => {
    return haversine(riderlocation, userlocation) || 0;
  };
  renderContent = () => {
    if (this.props.riders.length > 0) {
      var modifiedArr = [];
      var data = {};
      this.props.riders.forEach(element => {
        let distance = this.calcDistance(
            {latitude: element.latitude, longitude: element.longitude},
            {
              latitude: this.state.currentloclat,
              longitude: this.state.currentloclong,
            },
          ),
          data = {
            latitude: element.latitude,
            longitude: element.longitude,
            riderid: element.riderid,
            distanceFromUser: distance,
            eta: distance / element.speed,
            id: element.id,
            NotificationToken: element.NotificationToken,
          };
        modifiedArr.push(data);
      });
      return (
        <SuggestedRidersBottomSheet
          price={this.state.price}
          loading={this.state.loadingPrice}
          riders={modifiedArr}
        />
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            paddingTop: 120,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            There are no riders around you
          </Text>
        </View>
      );
    }
  };

  getCurrentRegion = () => ({
    latitude: this.state.currentloclat,
    longitude: this.state.currentloclong,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  getDestinationRegion = () => ({
    latitude: this.state.Destlatitude,
    longitude: this.state.Destlongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calculatePrice = async () => {
    try {
      const dist = {
        distance: this.state.distance,
      };
      //console.log(dist);
      if (this.props.riders.length > 0) {
        const res = await axios.post(BASE_URL + '/pricing/', dist);

        this.setState({
          price: res.data.rounded_price,
          buttonDisabled: false,
          loadingPrice: false,
        });
      }
      // console.log(res.data);
    } catch (e) {
      // console.log(e.message);
      //alert('please check your internet connection');
    }
  };

  topCard = () => {
    // console.log(this.state.originName);
    if (this.state.showtopcard) {
      return (
        <View style={styles.top}>
          <View style={styles.topItems}>
            <Text style={{marginRight: 8}}>{this.state.originName}</Text>
            <Icon
              name="arrow-right"
              size={12}
              color="#000"
              style={{margin: 2}}
            />
            <Text style={{marginLeft: 8}}>{this.state.destinationName}</Text>
            <Text
              style={{
                position: 'absolute',
                right: 0,
                margin: 10,
                fontWeight: 'bold',
              }}>
              {this.state.distance}Km
            </Text>
          </View>
        </View>
      );
    }
  };
  animateRiderMovement = () => {
    const duration = 100;
    {
      this.state.riders.map(riders =>
        this.state.coordinateRiders
          .timing({latitude: riders.latitude, longitude: riders.longitude})
          .start(),
      );
    }
  };
  render() {
    // console.log(this.props.destination);
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          initialRegion={this.getCurrentRegion()}
          ref={c => (this.mapView = c)}
          style={{...StyleSheet.absoluteFillObject}}>
          {this.props.riders
            ? this.props.riders.map(riders => (
                <Marker.Animated
                  ref={marker => {
                    this.markerRider = marker;
                  }}
                  // style={{
                  //   width: 40,
                  //   height: 40,
                  //   resizeMode: 'contain',
                  //   transform: [{rotate: `${riders.bearing}deg`}],
                  //   zIndex: 3,
                  // }}
                  coordinate={{
                    latitude: riders.latitude,
                    longitude: riders.longitude,
                  }}>
                  {/* <Image
                    source={require('../../assets/motor.png')}
                    style={{height: 40, width: 40}}
                  /> */}

                  {/* <Marker
                    tracksViewChanges={false}
                    coordinate={{
                      latitude: riders.latitude,
                      longitude: riders.longitude,
                    }}
                  /> */}
                </Marker.Animated>
              ))
            : null}

          <MapView.Marker
            tracksViewChanges={false}
            coordinate={this.getCurrentRegion()}>
            <Icon
              name="map-marker"
              size={24}
              color="#000"
              style={{margin: 2}}
            />
          </MapView.Marker>
          <MapView.Marker
            tracksViewChanges={false}
            coordinate={this.getDestinationRegion()}>
            <Icon
              name="stop-circle"
              size={24}
              color="#e7564c"
              style={{margin: 2}}
            />
          </MapView.Marker>
          {this.state.currentloclat && (
            <MapViewDirections
              origin={{...this.props.origin}}
              destination={this.props.destination}
              strokeWidth={5}
              mode={'DRIVING'}
              strokeColor="#e7564c"
              optimizeWaypoints={false}
              resetOnChange={false}
              apikey={GOOGLE_MAPS_APIKEY}
              onStart={params => {
                // console.log(
                //   `Started routing between "${params.origin}" and "${
                //     params.destination
                //   }"`,
                // );
              }}
              onReady={async result => {
                await this.setState({
                  distance: result.distance,
                  duration: result.duration,
                });

                this.calculatePrice();
                // console.log(`Distance: ${result.distance} km`);
                // console.log(`Duration: ${result.duration} min.`);

                // this.mapView.fitToCoordinates(result.coordinates, {
                //   edgePadding: {
                //     right: width / 50,
                //     bottom: height / 50,
                //     left: width / 50,
                //     top: height / 50,
                //   },
                // });
                this.mapView.animateCamera(
                  {
                    center: {
                      ...this.props.origin,
                      LATITUDE_DELTA: 0.9,
                      LONGITUDE_DELTA: 0.9,
                    },
                    pitch: 29,
                    heading: 50,
                    altitude: 200,
                    zoom: 12,
                  },
                  1000,
                );
              }}
              onError={errorMessage => {
                console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>

        <BottomDrawer
          containerHeight={height}
          offset={TAB_BAR_HEIGHT}
          startUp={false}
          onCollapsed={collapse => this.setState({showtopcard: true})}
          onExpanded={ex => {
            this.setState({showtopcard: false});
          }}>
          {!this.state.loadingLayout && !this.state.found
            ? this.renderContent()
            : this.state.found
            ? this.DriverDetailsLayout()
            : this.loadingLayout()}
        </BottomDrawer>
        {this.topCard()}
        <View style={styles.buttons}>
          <TouchableOpacity
            disabled={this.state.buttonDisabled}
            style={styles.bookButton}
            onPress={() =>
              this.setState(
                {loadingLayout: true},
                this.state.found
                  ? this.props.navigation.navigate('PaymentMethodsActivity', {
                      receipientPhone: this.props.route.params.receipientPhone,
                      price: this.state.price,
                      riderDetails: this.props.selected,
                      locationNames: {
                        origin: this.state.originName,
                        destination: this.state.destinationName,
                      },
                    })
                  : null,
              )
            }>
            {!this.state.loadingLayout && !this.state.found ? (
              <Text style={styles.bookButtonText}>SELECT RIDER</Text>
            ) : this.state.found ? (
              <Text style={styles.bookButtonText}>CONFRIM</Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
  destination: state.locationData.DestinationCoordinates,
  destinationName: state.locationData.destinationName,
  originName: state.locationData.originName,
  riders: state.nearby_riders.nearby,
  selected: state.selected_rider.riderDetails,
  authStatus: state.auth.user,
  //error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {
    getCurrentLocation,
    getDestinationCoordinates,
    getRiders,
    getSelectedRider,
    isSignedIn,
  },
)(DeliveryDestinationMap);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: width,
    position: 'absolute',
    backgroundColor: '#00000000',
    top: 0,
    marginTop: 30,
  },
  topItems: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    margin: 20,
    borderRadius: 8,
    elevation: 68,
  },
  buttons: {
    width: width,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  bookButton: {
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 3,
    margin: 12,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
