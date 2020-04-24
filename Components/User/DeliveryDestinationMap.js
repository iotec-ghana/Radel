/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';

import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import {connect} from 'react-redux';
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from '../../Actions/locationAction';
import axios from 'axios';
import {BASE_URL} from '../../constants';
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
import SuggestedRidersBottomSheet from './Layouts/SuggestedRidersBottomSheet';
import BottomDrawer from 'rn-bottom-drawer';
const {width, height} = Dimensions.get('window');
const TAB_BAR_HEIGHT = 80;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCWNecG4xgKaW3_RGqgGT5QZnk9knUesCA';
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
  renderContent = () => {
    return <SuggestedRidersBottomSheet price={this.state.price} />;
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

  componentDidMount = async () => {};
  calculatePrice = async () => {
    try {
      const dist = {
        distance: this.state.distance,
      };
      console.log(dist);
      const res = await axios.post(BASE_URL + '/pricing/', dist);
      this.setState({price: res.data.price});
      console.log(res.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  topCard = () => {
    console.log(this.state.originName);
    return (
      <View style={styles.top}>
        <View style={styles.topItems}>
          <Text style={{marginRight: 8}}>{this.state.originName}</Text>
          <Icon name="arrow-right" size={12} color="#000" style={{margin: 2}} />
          <Text style={{marginLeft: 8}}>{this.state.destinationName}</Text>
          <Text
            style={{
              position: 'absolute',
              right: 0,
              margin: 10,
              fontWeight: 'bold',
            }}>
            {this.state.distance}KM
          </Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          initialRegion={this.getCurrentRegion()}
          ref={c => (this.mapView = c)}
          style={{...StyleSheet.absoluteFillObject}}>
          <MapView.Marker coordinate={this.getCurrentRegion()} />
          <MapView.Marker coordinate={this.getDestinationRegion()} />
          {this.state.currentloclat && (
            <MapViewDirections
              origin={this.props.origin}
              destination={this.props.destination}
              strokeWidth={5}
              strokeColor="hotpink"
              optimizeWaypoints={true}
              apikey={GOOGLE_MAPS_APIKEY}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${
                    params.destination
                  }"`,
                );
              }}
              onReady={async result => {
                await this.setState({
                  distance: result.distance,
                  duration: result.duration,
                });
                this.calculatePrice();
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 50,
                    bottom: height / 50,
                    left: width / 50,
                    top: height / 50,
                  },
                });
              }}
              onError={errorMessage => {
                console.log('GOT AN ERROR');
              }}
            />
          )}
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
              this.props.navigation.navigate('PaymentMethodsActivity')
            }>
            <Text style={styles.bookButtonText}>BOOK NOW</Text>
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
  //error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {getCurrentLocation, getDestinationCoordinates},
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
