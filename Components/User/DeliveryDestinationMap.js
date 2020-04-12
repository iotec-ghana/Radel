/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
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
const TAB_BAR_HEIGHT = 80;

export default class DeliveryDestinationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  renderContent = () => {
    return <SuggestedRidersBottomSheet />;
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
          containerHeight={height / 3}
          offset={TAB_BAR_HEIGHT}
          startUp={true}
          onExpanded={ex => {}}
          shadow={true}>
          {this.renderContent()}
        </BottomDrawer>
        {this.topCard()}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.bookButton}
            onPress={() =>
              this.props.navigation.navigate('DeliveryDestinationMap')
            }>
            <Text style={styles.bookButtonText}>BOOK NOW</Text>
          </TouchableOpacity>
        </View>
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
