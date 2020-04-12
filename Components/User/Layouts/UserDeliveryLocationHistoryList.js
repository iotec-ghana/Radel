import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

//import pin from '../../../assets/map-pin.svg';
export default class UserDeliveryLocationHistoryList extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.main}>
        <Image
          source={require('../../../assets/map-pin.png')}
          style={styles.image}
        />
        <View style={styles.textsView}>
          <Text style={styles.Location}>Marwarko Fast Food - Labadi</Text>
          <Text style={styles.area}>
            Near Polyclinic Bus stop, La Road, Accra
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
  },
  image: {
    height: 24,
    width: 24,
    margin: 10,
  },
  textsView: {
    padding: 5,
  },
  Location: {
    fontSize: 18,
    marginBottom: 1,
  },
  area: {
    fontSize: 12,
  },
});
