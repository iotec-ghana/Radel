import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from './Components/User/Intro';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import MapsActivity from './Components/User/MapsActivity';
import EnterDestinationActivity from './Components/User/EnterDestinationActivity';
import DeliveryDestinationMap from './Components/User/DeliveryDestinationMap';
import PaymentMethodsActivity from './Components/User/PaymentMethodsActivity';
import AddCardActivity from './Components/User/AddCardActivity';
import BookProcessingActivity from './Components/User/BookProcessingActivity';
import PhoneVerificationActivity from './Components/User/PhoneVerificationActivity';
import GetStartedActivity from './Components/User/GetStartedActivity';
import WaitingForMomoPaymentActivity from './Components/User/WaitingForMomoPaymentActivity';
import SelectPaymentActivity from './Components/User/SelectPaymentActivity';
import AddMomoNumber from './Components/User/AddMomoNumber';
import RideHistoryActivity from './Components/User/RideHistoryActivity';
import MyPaymentsActivity from './Components/User/MyPaymentsActivity';
import * as Font from 'expo-font';
import {Root} from 'native-base';
import {render} from 'react-dom';
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
const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    this.loadAssetsAsync();
  }

  loadAssetsAsync = async () => {
    await Font.loadAsync({
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({fontLoaded: true});
  };
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
         <MainStack.Screen name="MyPaymentsActivity" component={MyPaymentsActivity} />
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
  render() {
    console.disableYellowBox = true;
    if (!this.state.fontLoaded) {
      return <Text>loading font</Text>;
    } else {
      return (
        <Root>
          {/* <StatusBar backgroundColor="#E9665D" barStyle="light-content" /> */}
          <Provider store={store}>
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
          </Provider>
        </Root>
      );
    }
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
