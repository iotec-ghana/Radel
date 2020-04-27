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
const Stack = createStackNavigator();
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
    <Provider store={store}>
      <NavigationContainer>
        {/* <MyStatusBar backgroundColor="#e7564c" barStyle="light-content" /> */}
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Intro} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={Register} />
          <Stack.Screen name="Main" component={MapsActivity} />
          <Stack.Screen
            name="DeliveryDestinationMap"
            component={DeliveryDestinationMap}
          />
          <Stack.Screen
            name="BookProcessingActivity"
            component={BookProcessingActivity}
          />
          <Stack.Screen name="AddCardActivity" component={AddCardActivity} />
          <Stack.Screen
            name="PaymentMethodsActivity"
            component={PaymentMethodsActivity}
          />
          <Stack.Screen
            name="SelectPaymentActivity"
            component={SelectPaymentActivity}
          />
          <Stack.Screen name="AddMomoNumber" component={AddMomoNumber} />
          <Stack.Screen
            name="PhoneVerificationActivity"
            component={PhoneVerificationActivity}
          />
          <Stack.Screen
            name="destination"
            component={EnterDestinationActivity}
          />
          <Stack.Screen
            name="GetStartedActivity"
            component={GetStartedActivity}
          />
          <Stack.Screen
            name="WaitingForMomoPaymentActivity"
            component={WaitingForMomoPaymentActivity}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default App;
