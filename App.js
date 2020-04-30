import 'react-native-gesture-handler';
import React from 'react';
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
import {Root} from 'native-base';
const config = {
  animation: 'spring',
  config: {
    stiffness: 500,
    damping: 100,
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
const App: () => React$Node = () => {
  console.disableYellowBox = true;

  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer>
          {/* <MyStatusBar backgroundColor="#e7564c" barStyle="light-content" /> */}
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={MainStackScreen}
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
};
function MainStackScreen() {
  return (
    <MainStack.Navigator
      initialRouteName="Main"
      screenOptions={{headerShown: false}}>
      <MainStack.Screen name="Intro" component={Intro} />
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
    </MainStack.Navigator>
  );
}
const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default App;
