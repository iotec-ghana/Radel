/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import {StackActions} from '@react-navigation/native';
import {isSignedIn} from '../../Actions/authAction';
import {connect} from 'react-redux';
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from '../../Actions/locationAction';

class WaitingForMomoPaymentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.route.params.type,
      network: props.route.params.network,
      number: props.route.params.number,
      paymentID: 0,
      runCount: null, //used to make sure the payment api is not called more than once
      pollcount: 0,
      hasPaid: false,
    };
  }
  //   componentWillUnmount() {
  //     this.setState({hasPaid: true});
  //   }

  componentDidUpdate = async (prevProps, prevState, snapshot) => {
    // if ((await AsyncStorage.getItem('paymentCheck')) !== null) {
    //   console.log(prevState.hasPaid);
    // }
  };

  componentWillUnmount() {
    console.log('unmounted');
  }
  componentDidMount = async () => {
    console.log(this.props.route.params.receipientPhone);
    try {
      //await AsyncStorage.removeItem('paymentCheck');
      //check if paymentcheck is set to localstorage
      if ((await AsyncStorage.getItem('paymentCheck')) === null) {
        console.log('localstorage is empty');
        const data = {
          runCount: 0,
          hasPaid: false,
          paymentID: null,
        };

        await AsyncStorage.setItem('paymentCheck', JSON.stringify(data));
        this.setState({runCount: 0});
      }
      console.log('runcount is ' + this.state.runCount);
      // if set and runCount is 0 then run makePaymentRequest once
      // const read = await AsyncStorage.getItem('paymentCheck');
      // const data = JSON.parse(read);
      if (this.state.runCount === 0) {
        console.log('has been called');

        const pid = await this.makePaymentRequest();
        this.setState({runCount: 1});
        const updateLocalstorage = {
          runCount: 1,
          hasPaid: false,
          paymentID: pid,
        };

        await AsyncStorage.setItem(
          'paymentCheck',
          JSON.stringify(updateLocalstorage),
        );
      }

      if (this.state.runCount === 1) {
        const readdata = await AsyncStorage.getItem('paymentCheck');
        const pid = JSON.parse(readdata);
        //if user has not yet paid keep checking the databse for a successful payment every 2seconds

        const pollingID = setInterval(() => {
          this.checkPaymentStatus(pid.paymentID);
          if (this.state.hasPaid) {
            clearInterval(pollingID);
          }
        }, 4000);
        console.log(pid.paymentID + ' this is current paymentid');

        // setInterval(() => console.log('yes'), 300);
      }
    } catch (e) {}
  };

  //polls the database every 4 seconds
  checkPaymentStatus = async id => {
    try {
      this.setState({pollcount: this.state.pollcount + 1});
      console.log(`${BASE_URL}/checkstatuspayment/${id}`);
      const response = await axios.get(`${BASE_URL}/checkstatuspayment/${id}`);
      //console.log(this.state.pollcount + 'this is pollcount');
      console.log(response.data.status);
      if (response.data.status === 'success') {
        this.setState({hasPaid: true});
        //console.log('yess');
        await this.UploadRideDetails();
        await AsyncStorage.removeItem('paymentCheck');
        this.props.navigation.dispatch(
          StackActions.replace('BookProcessingActivity'),
        );
        // this.props.navigation.pop(2);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  // make initial payment request. this function runs only once
  makePaymentRequest = async () => {
    try {
      const user = this.props.authStatus;
      const payload = {
        email: user.user.email,
        phonenumber: user.user.phone_number,
        firstname: user.user.first_name,
        lastname: user.user.last_name,
        amount: this.props.route.params.price,
        network: this.state.network,
      };
      console.log(payload);

      const sendPayment = await axios.post(BASE_URL + '/paywithMomo/', payload);
      this.setState({paymentID: sendPayment.data.paymentid});
      //console.log(sendPayment.data.paymentid);
      return sendPayment.data.paymentid;
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
  UploadRideDetails = async () => {
    let startId = Math.floor(1000 + Math.random() * 9000);
    let endId = Math.floor(1000 + Math.random() * 9000);
    const {id} = this.props.authStatus.user;
    try {
      const getCode = await axios.get(BASE_URL + '/getCode');
      const code = getCode.data.code.replace(',', '');
      const deliveryPayload = {
        userId: id,
        riderId: this.props.route.params.riderDetails.id,
        startLocationID: startId,
        endLocationID: endId,
        startlocationCoordinates: {
          ...this.props.origin,
          startLocationID: startId,
        },
        endlocationCoordinates: {
          ...this.props.destination,
          endLocationID: endId,
        },
        requestTime: Date.now(),
        startTime: Date.now(),
        deliveryStatus: 'processing',
        deliveryTime: '',
        code: code,
        paymentId: this.state.paymentID,
        receipientTel: this.props.route.params.receipientPhone,
      };
      console.log(deliveryPayload);
      const response = await axios.post(
        BASE_URL + '/bookride/',
        deliveryPayload,
      );
      console.log(response.data);
    } catch (error) {
      console.log(error)
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Toolbar icon={'arrow-left'} navigation={this.props.navigation} />
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
const mapStateToProps = state => ({
  authStatus: state.auth,
  origin: state.locationData.OriginCoordinates,
  destination: state.locationData.DestinationCoordinates,
});
export default connect(
  mapStateToProps,
  {isSignedIn, getCurrentLocation, getDestinationCoordinates},
)(WaitingForMomoPaymentActivity);
