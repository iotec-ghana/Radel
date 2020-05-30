/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
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
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
import {connect} from 'react-redux';
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from '../../Actions/locationAction';
import MapViewDirections from 'react-native-maps-directions';
import BottomDrawer from 'rn-bottom-drawer';
const {width, height} = Dimensions.get('window');
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
class BookProcessingActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancelBtn: false,
      btnText: 'Cancel',
      processing: false,
      currentloclat: this.props.origin.latitude,
      currentloclong: this.props.origin.longitude,
      Destlatitude: this.props.destination.latitude,
      Destlongitude: this.props.destination.longitude,
      distance: 0,
      duration: 0,
      originName: this.props.originName.substr(
        0,
        this.props.originName.indexOf(','),
      ),
      destinationName: this.props.destinationName.substr(
        0,
        this.props.destinationName.indexOf(','),
      ),
      bottomDrawerParams: {
        offset: 0,
        height: height / 3,
      },
    };

    this.mapView = null;
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
      <View style={{flex: 1, alignItems: 'center',}}>
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

  getDestinationRegion = () => ({
    latitude: this.state.Destlatitude,
    longitude: this.state.Destlongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  getCurrentRegion = () => ({
    latitude: this.state.currentloclat,
    longitude: this.state.currentloclong,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  topCard = () => {
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
          showUserLocation
          followUserLocation
          loadingEnabled
          ref={c => (this.mapView = c)}
          initialRegion={this.getCurrentRegion()}
          style={{...StyleSheet.absoluteFillObject}}>
          <MapView.Marker coordinate={this.getCurrentRegion()}>
            <Icon
              name="map-marker"
              size={24}
              color="#000"
              style={{margin: 2}}
            />
          </MapView.Marker>
          <MapView.Marker coordinate={this.getDestinationRegion()}>
            <Icon
              name="stop-circle"
              size={24}
              color="#000"
              style={{margin: 2}}
            />
          </MapView.Marker>
          <MapViewDirections
            origin={this.props.origin}
            destination={this.props.destination}
            strokeWidth={3}
            strokeColor="black"
            optimizeWaypoints={true}
            apikey={GOOGLE_MAPS_APIKEY}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${
                  params.destination
                }"`,
              );
            }}
            onReady={result => {
              this.setState({
                distance: result.distance,
                duration: result.duration,
              });
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
              console.log('GOT AN ERROR');
            }}
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
const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
  destination: state.locationData.DestinationCoordinates,
  destinationName: state.locationData.destinationName,
  originName: state.locationData.originName,
  error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {getCurrentLocation, getDestinationCoordinates},
)(BookProcessingActivity);
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
