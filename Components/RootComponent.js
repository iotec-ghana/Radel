import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from './User/Intro';
import Login from './User/Login';
import Register from './User/Register';
import MapsActivity from './User/MapsActivity';
import EnterDestinationActivity from './User/EnterDestinationActivity';
import DeliveryDestinationMap from './User/DeliveryDestinationMap';
import PaymentMethodsActivity from './User/PaymentMethodsActivity';
import AddCardActivity from './User/AddCardActivity';
import BookProcessingActivity from './User/BookProcessingActivity';
import PhoneVerificationActivity from './User/PhoneVerificationActivity';
import GetStartedActivity from './User/GetStartedActivity';
import WaitingForMomoPaymentActivity from './User/WaitingForMomoPaymentActivity';
import SelectPaymentActivity from './User/SelectPaymentActivity';
import AddMomoNumber from './User/AddMomoNumber';
import RideHistoryActivity from './User/RideHistoryActivity';
import MyPaymentsActivity from './User/MyPaymentsActivity';
import SupportActivity from './User/SupportActivity';
import {connect} from 'react-redux';
import {getCurrentLocation} from '../Actions/locationAction';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
const taskName = 'user-background-location';
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 500,
    mass: 1,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

class RootComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    const {status} = await Location.requestPermissionsAsync();
    await AsyncStorage.setItem(
      'currentLocation',
      JSON.stringify(this.props.getCurrentLocation),
    );
    console.log(await AsyncStorage.getItem('currentLocation'));
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(taskName, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }

  MainStackScreen() {
    return (
      <MainStack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <MainStack.Screen
          name="Intro"
          component={Intro}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
        />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="SignUp" component={Register} />
        <MainStack.Screen name="SupportActivity" component={SupportActivity} />

        <MainStack.Screen name="Main" component={MapsActivity} />
        <MainStack.Screen
          name="DeliveryDestinationMap"
          component={DeliveryDestinationMap}
        />
        <MainStack.Screen
          name="BookProcessingActivity"
          component={BookProcessingActivity}
        />
        <MainStack.Screen name="AddCardActivity" component={AddCardActivity} />
        <MainStack.Screen
          name="PaymentMethodsActivity"
          component={PaymentMethodsActivity}
        />
        <MainStack.Screen
          name="MyPaymentsActivity"
          component={MyPaymentsActivity}
        />
        <MainStack.Screen
          name="SelectPaymentActivity"
          component={SelectPaymentActivity}
        />
        <MainStack.Screen name="AddMomoNumber" component={AddMomoNumber} />
        <MainStack.Screen
          name="PhoneVerificationActivity"
          component={PhoneVerificationActivity}
        />

        <MainStack.Screen
          name="GetStartedActivity"
          component={GetStartedActivity}
        />
        <MainStack.Screen
          name="WaitingForMomoPaymentActivity"
          component={WaitingForMomoPaymentActivity}
        />
        <MainStack.Screen
          name="RideHistoryActivity"
          component={RideHistoryActivity}
        />
      </MainStack.Navigator>
    );
  }
  static getloc = async () => {
    const currentLocation = await AsyncStorage.getItem('currentLocation');
    return JSON.parse(currentLocation);
  };

  render() {
    //test()
    return (
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={this.MainStackScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="destination"
            component={EnterDestinationActivity}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
const mapStateToProps = state => ({
  origin: state.locationData.OriginCoordinates,
});
export default connect(
  mapStateToProps,
  {getCurrentLocation},
)(RootComponent);
TaskManager.defineTask(taskName, async ({data, error}) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error);
    return;
  }
  if (data) {
    // const user = await AsyncStorage.getItem('authdata');
    // const data = JSON.parse(user);
    const {locations} = data;
   getCurrentLocation(locations[0].coords)
   
  }
});
