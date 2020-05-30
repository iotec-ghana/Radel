import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UpcomingFragment from './UpcomingFragment';
import CompletedRidesFragment from './CompletedRidesFragment';
import {View, StatusBar, Text} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import {StatusBarColor} from '../../constants';

const Tab = createMaterialTopTabNavigator();

export default class RideHistoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Toolbar icon={'arrow-left'} navigation={this.props.navigation} />
        <StatusBar backgroundColor={StatusBarColor} barStyle="light-content" />
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 30,
            marginHorizontal: 16,
            marginVertical: 10,
            color: '#000', 
          }}> 
          My rides
        </Text>
        <Tab.Navigator
          lazy={true}
          
          initialRouteName="upcoming"
          tabBarOptions={{
            activeTintColor: '#e7564c',
            inactiveTintColor: '#000',
            labelStyle: {fontSize: 12, fontWeight: 'bold'},
            tabStyle: {color: '#e7564c'},
            style: {color: '#e7564c',},
            indicatorStyle:{color:"black"},
            
           
            
          }}>
          <Tab.Screen  name="upcoming"  component={UpcomingFragment} />
          <Tab.Screen name="completed" component={CompletedRidesFragment} />
        </Tab.Navigator>
      </View>
    );
  }
}
