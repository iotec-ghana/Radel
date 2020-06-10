//import 'react-native';
import React from 'react';
//import App from '../App';
import {View, Text} from 'react-native';
//import MapsActivity from '../Components/User/MapsActivity';
import Login from '../Components/User/Login';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Login />);
});

it('checks', () => {
  renderer.create(<View><Text>I am</Text></View>)
});
