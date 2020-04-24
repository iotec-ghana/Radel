/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants';
export default class WaitingForMomoPaymentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.route.params.type,
      network: props.route.params.network,
      number: props.route.params.number,
      paymentID: 0,
      runCount: 0, //used to make sure the payment api is not called more than once
    };
  }
  componentDidMount = async () => {
    try {
      //check if paymentcheck is set to localstorage
      if (AsyncStorage.getItem('paymentCheck') == null) {
        const data = {
          runCount: 0,
          hasPaid: false,
        };
        await AsyncStorage.setItem('paymentCheck', JSON.stringify(data));
      } else {
        // if set and runCount is 0 then run makePaymentRequest once
        const read = await AsyncStorage.getItem('paymentCheck');
        const data = JSON.parse(read);
        const {paymentID} = this.state;
        if (data.runCount === 0) {
          this.makePaymentRequest();
          const updateLocalstorage = {
            runCount: 1,
            hasPaid: false,
          };
          await AsyncStorage.setItem(
            'paymentCheck',
            JSON.stringify(updateLocalstorage),
          );
        } else {
          //if user has not yet paid keep checking the databse for a successful payment every 2seconds
          setInterval(this.checkPaymentStatus(paymentID), 2000);
        }
      }
    } catch (e) {}
  };

  checkPaymentStatus = async id => {
    try {
      const response = await axios.get(`${BASE_URL}/payment/${id}`);
      console.log(response.data);
      if (response.data.status === 'success') {
        this.props.navigation.navigate('BookProcessingActivity');
        const updateLocalstorage = {
          runCount: 1,
          hasPaid: true,
        };
        //update local storage and set has paid to true so that the
        // user is redirected to BookProcessingActivity even when app closes unexpectedly
        await AsyncStorage.setItem(
          'paymentCheck',
          JSON.stringify(updateLocalstorage),
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  makePaymentRequest = async () => {
    try {
      const data = await AsyncStorage.getItem('authdata');
      const user = JSON.parse(data);
      const payload = {
        email: user.user.email,
        phonenumber: user.user.phone_number,
        firstname: user.user.first_name,
        lastname: user.user.last_name,
        amount: '35',
        network: this.state.network,
      };
      const sendPayment = await axios.post(BASE_URL + '/paywithMomo/', payload);
      this.setState({paymentID: sendPayment.data.id});
    } catch (e) {
      console.log(e.message);
    }
  };
  mtnInstructions = () => {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.mtnlist}>
          1. Dial *170# to see the main ussd menu
        </Text>
        <Text style={styles.mtnlist}>2. Choose option 6: My Wallet</Text>
        <Text style={styles.mtnlist}>3. Choose option 3: My Approvals</Text>
        <Text style={styles.mtnlist}>4. Enter your pin to proceed</Text>
        <Text style={styles.mtnlist}>
          5. Look for the transaction and follow the prompts to authorize it.
          Make sure the amount is correct
        </Text>
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Toolbar icon={'chevron-left'} navigation={this.props.navigation} />
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={require('../../assets/spinner.gif')}
            style={{height: 100, width: 100}}
          />

          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              marginTop: 0,
              fontSize: 38,
              marginLeft: 20,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            Waiting for Payment
          </Text>
          <Text
            style={{
              marginTop: 0,
              fontSize: 18,
              marginLeft: 20,
              marginRight: 20,
              textAlign: 'left',
            }}>
            Network: {this.state.network}{' '}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              marginLeft: 20,
              marginRight: 20,
              textAlign: 'left',
            }}>
            Please follow the instructions and do not refresh or leave this page
          </Text>
          {this.mtnInstructions()}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mtnlist: {
    fontSize: 18,
    margin: 5,
  },
});
