/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import {Picker} from 'native-base';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import {AsyncStorage} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class AddMomoNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: '',
      phone: '',
      loading: false,
      error: '',
    };
  }
  onValueChange(value) {
    this.setState({
      network: value,
    });
  }

  onNumberChange(number) {
    this.setState({phone: number});
  }
  onSubmit = async () => {
    try {
      this.setState({loading: true});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);
      console.log(token.user.token);
      if (this.state.network !== '') {
        //set header authorization token
        const config = {
          headers: {Authorization: `Bearer ${token.user.token}`},
        };
        this.setState({loading: true});
        const {network, phone} = this.state;
        const payload = {
          type: 'momo',
          details: {
            number: phone,
            network: network,
          },
        };
        const response = await axios.post(
          BASE_URL + '/createPayment/',
          payload,
          config,
        );
        console.log(response.data);
        this.props.navigation.navigate('PaymentMethodsActivity');
      } else {
        alert('please select a network');
      }
      this.setState({loading: false});
    } catch (e) {
      console.log(e.message);
      alert('there was a problem');
      this.setState({loading: false});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Toolbar icon={'arrow-left'} navigation={this.props.navigation} />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => this.onSubmit()}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.SaveButtonText}>SAVE</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 12,
              marginBottom: 4,
              opacity: 0.5,
            }}>
            Select network
          </Text>
          <Picker
            placeholderStyle={{color: '#2874F0'}}
            note={false}
            mode="dropdown"
            placeholder="Select Network"
            style={{
              borderWidth: 2,
              borderColor: '#000',
              backgroundColor: '#fafafa',
            }}
            selectedValue={this.state.network}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="------Select Network------" value="" />
            <Picker.Item label="MTN" value="MTN" />
            <Picker.Item label="AirtelTigo" value="AirtelTigo" />
            <Picker.Item label="Vodafone" value="Vodafone" />
          </Picker>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 12,
              marginBottom: 4,
              opacity: 0.5,
            }}>
            Enter Mobile Number
          </Text>
          <TextInput
            style={styles.input}
            keyboardType={'numeric'}
            placeholder="Enter Mobile Number"
            onChangeText={text => this.onNumberChange(text)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },
  body: {
    padding: 20,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 15,
  },

  button: {
    width: width,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  saveButton: {
    margin: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 2,
  },
  SaveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
