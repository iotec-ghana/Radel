/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from 'react-native-hr-component';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import PolylineDirection from '@react-native-maps/polyline-direction';
const origin = {latitude: 19.363631, longitude: -99.182545};
const destination = {latitude: 19.2932543, longitude: -99.1794758};
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
import SuggestedRidersBottomSheet from './Layouts/SuggestedRidersBottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
const {width, height} = Dimensions.get('window');
const DestLATITUDE = 5.65216019;
const DestLONGITUDE = -0.21357053;

export default class BookProcessingActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelBtn: false,
      btnText: 'Cancel',
      processing: false,
      bottomDrawerParams: {
        offset: 0,
        height: height / 3,
      },
      Destlatitude: DestLATITUDE,
      Destlongitude: DestLONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      locationName: '',
      prevLatLng: {},

      // Destinationcoordinate: new AnimatedRegion({
      //   latitude: LATITUDE,
      //   longitude: LONGITUDE,
      //   latitudeDelta: 0,
      //   longitudeDelta: 0,
      // }),
    };
  }

  process = async () => {
    //fetch driver details
    this.setState({
      processing: true,
    });
  };
  componentDidMount() {
    setTimeout(this.process, 4000);
  }
  DriverDetailsLayout = () => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15}}>
          WE HAVE FOUND YOU A RIDER
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#e7564c',
            fontSize: 14,
            marginTop: 10,
          }}>
          Rider will pickup your items in {'02:45'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 20,
              backgroundColor: '#fafafa',
              borderRadius: 40,
              marginRight: 30,
            }}>
            <Icon name="phone" size={24} color="#000" style={{margin: 2}} />
          </View>

          <View style={{}}>
            <Image
              source={require('../../assets/deedat.jpg')}
              style={{height: 100, width: 100, borderRadius: 100}}
            />
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: '#fafafa',
              borderRadius: 40,
              marginLeft: 30,
            }}>
            <Icon name="phone" size={24} color="#000" style={{}} />
          </View>
        </View>

        <Text
          style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 16,
            marginTop: 10,
          }}>
          Deedat Billa
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
  };
  loadingLayout = () => {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          source={require('../../assets/spinner.gif')}
          style={{height: 100, width: 100}}
        />
        <Text style={{fontWeight: 'bold', fontSize: 18}}>
          WE ARE PROCESSING YOUR BOOKING
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 20}}>
          Your rider will be there soon
        </Text>
      </View>
    );
  };

  getDestinationReagion = () => ({
    latitude: this.state.Destlatitude,
    longitude: this.state.Destlongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  topCard = () => {
    return (
      <View style={styles.top}>
        <View style={styles.topItems}>
          <Text style={{marginRight: 8}}>Westland</Text>
          <Icon name="arrow-right" size={12} color="#000" style={{margin: 2}} />
          <Text style={{marginLeft: 8}}>Kasoa</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getDestinationReagion()}
          style={{...StyleSheet.absoluteFillObject}}>
          {/* <Marker coordinate={this.getDestinationReagion} /> */}

          <PolylineDirection
            origin={origin}
            destination={destination}
            apiKey={'AIzaSyCF1Jur9qHYa6q07JWBMyVjQ2DqOlSJ2qc'}
            strokeWidth={4}
            strokeColor="#12bc00"
          />
        </MapView>
        <BottomDrawer
          containerHeight={this.state.bottomDrawerParams.height}
          offset={this.state.bottomDrawerParams.offset}
          startUp={true}
          onExpanded={ex => {}}
          shadow={true}>
          {!this.state.processing
            ? this.loadingLayout()
            : this.DriverDetailsLayout()}
        </BottomDrawer>
        {this.topCard()}
        {/* {this.state.showCancelBtn ? (
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() =>
                this.props.navigation.navigate('PaymentMethodsActivity')
              }>
              <Text style={styles.bookButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null} */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: width,
    position: 'absolute',
    backgroundColor: '#00000000',
    top: 0,
  },
  topItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
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
