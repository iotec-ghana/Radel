/* eslint-disable react-native/no-inline-styles */
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
  StatusBar,
  Image,
} from 'react-native';

import {PV_API, StatusBarColor} from '../../constants';
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
import {GOOGLE_MAPS_APIKEY} from 'react-native-dotenv';
import {Toast} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';

class EnterDestinationActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: this.props.origin,
      destination: {},
      disableButton: true,
      originName: props.originName,
      rphone: null,
    };
  }

  Next = async () => {
    if (this.state.rphone.length < 10) {
      alert('phone number has less than 10 digits');
    } else {
      this.props.navigation.navigate('DeliveryDestinationMap', {
        receipientPhone: this.state.rphone,
      });
    }
  };
  getPhoneNumber = async () => {};
  componentDidMount = async () => {
    //this.props.getCurrentLocation();
    console.log(this.props.origin);
  };
  rchange(txt) {
    this.setState({rphone: txt});
  }
  render() {
    return (
      <View style={styles.main}>
        <Toolbar
          icon={'ios-arrow-back'}
          // right={'Sign Up'}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
          // righSideRoute={'SignUp'}
        />
        <StatusBar
          barStyle="dark-content"
          // translucent={true}
          backgroundColor={StatusBarColor}
        />
        <TextInput
          style={styles.input}
          placeholder={'Pickup Location'}
          value={this.state.originName}
        />
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10,
          }}>
          <TextInput
            style={{
              flex: 1,
              height: 50,
              padding: 10,

              backgroundColor: '#fafafa',
            }}
            placeholder={'Reciepient phone number'}
            value={this.state.rphone}
            keyboardType={'numeric'}
            onChangeText={txt => this.rchange(txt)}
          />
          {/* <TouchableOpacity
            style={{padding: 10}}
            onPress={async () => this.getPhoneNumber()}> */}
          {/* <Icon
              name={'user-plus'}
              size={30}
              color="#000"
              style={{margin: 6}}
            /> */}
          {/* <Text
              style={{
                margin: 6,
                fontWeight: 'bold',
                textAlignVertical: 'center',
                textAlign: 'center',
              }}>
              Choose contact
            </Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => {
              this.state.disableButton || this.state.rphone === null
                ? Toast.show({
                    text: 'You must set a delivery destination first',
                    buttonText: 'Okay',
                    duration: 2000,
                  })
                : this.Next();
            }}>
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
          onPress={async (data, details = null) => {
            // 'details' is provided when fetchDetails = true

            const dest = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              destinationName: details.formatted_address,
            };
            await this.props.getDestinationCoordinates(dest);
            if (details.formatted_address !== null) {
              this.setState({disableButton: false});
            }
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
              borderRadius: 0,
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
    backgroundColor: '#fff',
  },
  container: {
    padding: 3,
  },

  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
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
