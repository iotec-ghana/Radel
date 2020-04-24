import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import Config from 'react-native-config';

import {PV_API} from '../../constants';
import axios from 'axios';
import {connect} from 'react-redux';
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from '../../Actions/locationAction';
import Toolbar from './Layouts/Toolbar';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import UserDeliveryLocationHistoryList from './Layouts/UserDeliveryLocationHistoryList';
const GOOGLE_MAPS_APIKEY = 'AIzaSyCWNecG4xgKaW3_RGqgGT5QZnk9knUesCA';

class EnterDestinationActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.origin,
      destination: {},
      originName: props.originName,
    };
  }

  Next = () => {
    
    this.props.navigation.navigate('DeliveryDestinationMap');
  };
  componentDidMount = async () => {
    //this.props.getCurrentLocation();
    console.log(this.props.origin);

  };

  
  render() {
    return (
      <View style={styles.main}>
        <Toolbar
          icon={'times'}
          // right={'Sign Up'}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
          // righSideRoute={'SignUp'}
        />
        <TextInput
          style={styles.input}
          placeholder={'Current Location'}
          value={this.state.originName}
        />

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => this.Next()}>
            <Text style={styles.setButtonText}>SET DESTINATION</Text>
          </TouchableOpacity>
        </View>

        <GooglePlacesAutocomplete
          placeholder="Enter delivery destination"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true

            const dest = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              destinationName: details.formatted_address,
            };
            this.props.getDestinationCoordinates(dest);
          }}
          getDefaultValue={() => ''}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
            components: 'country:gh',
            // radius: 5000,
            // types: '(cities)', // default: 'geocode'
          }}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 50,
              padding: 10,
              backgroundColor: '#fafafa',
              margin: 10,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
              height: 200,
            },
          }}
          //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
          // currentLocationLabel="Current location"
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          // GoogleReverseGeocodingQuery={
          //   {
          //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          //   }
          // }
          // GooglePlacesSearchQuery={{
          //   // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          //   rankby: 'distance',
          //   type: 'cafe',
          // }}
          // GooglePlacesDetailsQuery={{
          //   // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          //   fields: 'formatted_address',
          // }}
          // filterReverseGeocodingByTypes={[
          //   'locality',
          //   'administrative_area_level_3',
          // ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}
          debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
          // renderRightButton={() => <Text>Custom text after the input</Text>}
        />

        {/* <SafeAreaView>
              <FlatList
                data={DATA}
                renderItem={({item}) => <UserDeliveryLocationHistoryList />}
                keyExtractor={item => item.id}
              />
            </SafeAreaView> */}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
  destination: state.locationData.DestinationCoordinates,
  originName: state.locationData.originName,
  error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {getCurrentLocation, getDestinationCoordinates},
)(EnterDestinationActivity);
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 3,
  },

  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    margin: 10,
  },
  button: {
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 3,
  },
  setButton: {
    margin: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 2,
  },
  setButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
