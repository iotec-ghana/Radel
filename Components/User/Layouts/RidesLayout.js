import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class RidesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Text>Today, 10:30 AM</Text>
        <Text>RadelGo</Text>
        <View>
        <Ionicons name="ios-pin" size={24} color="black" />
        <Text>Kasoa</Text>
        <Text>GHC 15</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  date:{
      fontSize:15,

  }
});
