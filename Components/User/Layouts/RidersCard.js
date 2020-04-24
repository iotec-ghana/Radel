/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class RidersCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // eslint-disable-next-line no-lone-blocks
    {
      this.props.arr.indexOf(this.props.data) === 0
        ? ((this.border = [
            {
              borderWidth: 2,
              borderColor: '#e7564c',
              backgroundColor: '#fafafa',
            },
          ]),
          (this.image = 80))
        : ((this.border = [{backgroundColor: '#fafafa'}]), (this.image = 50));
    }
    
    return (
      // row

      <TouchableOpacity
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          ...this.border[0],
          flex: 1,
          flexDirection: 'row',
          padding: 10,
          margin: 2,
          borderRadius: 5,
        }}>
        <View style={styles.radelGo}>
          <Text style={styles.radelGoText}>RadelGO</Text>

          {this.props.arr.indexOf(this.props.data) === 0 ? (
            <Text style={styles.bestText}>Best Save</Text>
          ) : null}

          <View style={styles.PriceTime}>
            <Text style={styles.price}>GHC{this.props.price}</Text>
            <Icon name="clock-o" size={14} color="#000" style={{margin: 2}} />
            <Text style={styles.time}>{this.props.data.time}</Text>
          </View>
        </View>

        <Image
          source={require('../../../assets/motor.png')}
          style={{
            height: this.image,
            width: this.image,
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
  container: {},
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
