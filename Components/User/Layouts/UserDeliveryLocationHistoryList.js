import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from 'react-native-maps';
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
import MapViewDirections from 'react-native-maps-directions';
import {Feather} from '@expo/vector-icons';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Feather';
//import pin from '../../../assets/map-pin.svg';

export default class UserDeliveryLocationHistoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {coord: this.props.origin, icon: 'map-marker'},
        {coord: this.props.destination, icon: 'stop-circle'},
      ],
    };
  }
  getCurrentRegion = () => ({
    ...this.props.origin,
  });
  render() {
   
    console.log(this.getCurrentRegion());
    return (
      <TouchableOpacity style={styles.main} activeOpacity={0.9}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            padding: 4,
            opacity: 0.6,
          }}>
          Today, 10:30AM
        </Text>
        <MapView
          zoomEnabled={false}
          zoomTapEnabled={false}
          zoomControlEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          cacheEnabled={true}
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          style={{height: 160}}
          region={this.props.origin}
          ref={c => (this.mapView = c)}>
            {this.state.markers.map(coords=>{
              
              <MapView.Marker coordinate={coords.coord}>
              <Icon
                name={`${coords.icon}`}
                size={24}
                color="#000"
                style={{margin: 2}}
              />
            </MapView.Marker>
            })}
          
          {/* <MapView.Marker coordinate={this.props.destination}>
            <Icon
              name="stop-circle"
              size={24}
              color="#e7564c"
              style={{margin: 2}}
            />
          </MapView.Marker> */}

          <MapViewDirections
            origin={this.props.origin}
            destination={this.props.destination}
            strokeWidth={4}
            strokeColor="#e7564c"
            optimizeWaypoints={true}
            apikey={GOOGLE_MAPS_APIKEY}
            onStart={params => {
              // console.log(
              //   `Started routing between "${params.origin}" and "${
              //     params.destination
              //   }"`,
              // );
            }}
            onReady={async result => {
              // await this.setState({
              //   distance: result.distance,
              //   duration: result.duration,
              // });

              // console.log(`Distance: ${result.distance} km`);
              // console.log(`Duration: ${result.duration} min.`);

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
        </MapView>
        {/* <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 4}}>
          RadelGo
        </Text> */}
        <View style={{flexDirection: 'row', padding: 0, flex: 1,marginVertical:5}}>
          <Icon name="map-pin" size={13} color="#e7564c" style={{margin: 0}} />
          <Text style={{marginLeft: 2, fontWeight: 'bold', fontSize: 13}}>
            West land - Kasoa
          </Text>

          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              position: 'absolute',
              right: 0,
              margin: 0,
              color: '#e7564c',
            }}>
            GHC25.60
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,

    borderRadius: 10,
    margin: 10,
    padding: 10,
    backgroundColor: '#f7f9fc',
    elevation:170
  },
  image: {
    height: 24,
    width: 24,
    margin: 10,
  },
  textsView: {
    padding: 5,
  },
  Location: {
    fontSize: 18,
    marginBottom: 1,
  },
  area: {
    fontSize: 12,
  },
});
