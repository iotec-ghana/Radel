import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
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

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
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
        <Stack.Screen
          name="PaymentMethodsActivity"
          component={PaymentMethodsActivity}
        />
        <Stack.Screen name="AddCardActivity" component={AddCardActivity} />
        <Stack.Screen name="destination" component={EnterDestinationActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
