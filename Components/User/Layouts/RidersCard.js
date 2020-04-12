import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RidersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // row
      <TouchableOpacity style={styles.container}>
        <View style={styles.radelGo}>
          <Text style={styles.radelGoText}>RadelGO</Text>
          <Text style={styles.bestText}>Best Save</Text>

          <View style={styles.PriceTime}>
            <Text style={styles.price}>GHC{this.props.data.price}</Text>
            <Icon name="clock-o" size={14} color="#000" style={{margin: 2}} />
            <Text style={styles.time}>{this.props.data.time}</Text>
          </View>
        </View>

        <Image
          source={require('../../../assets/motor.png')}
          style={{
            height: 80,
            width: 80,
            margin: 5,
            position: 'absolute',
            right: 0,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fafafa',
    margin: 2,
    borderRadius: 5,
  },
  radelGo: {
    padding: 2,
  },
  radelGoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  bestText: {
    color: '#ffaa00',
    fontSize: 12,
    marginBottom: 5,
  },
  PriceTime: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',

    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 18,
  },
  price: {
    fontSize: 14,
    color: '#e7564c',
    marginRight: 7,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,

    fontWeight: 'bold',
  },
});
