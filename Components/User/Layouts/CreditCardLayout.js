/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CreditCardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Icon
          name={this.props.item.image}
          size={50}
          color={this.props.item.color}
          style={{margin: 2}}
        />
        <View style={styles.misc}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 4}}>
            **** **** **** {this.props.item.last4}
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
            Expires {this.props.item.expdate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    // borderColor: '#e7564c',
    // borderWidth: 2,

    // justifyContent: 'center',
    // alignContent: 'center',
  },

  misc: {
    flex: 1,
    marginLeft: 10,
  },

  tickWrapper: {
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#e7564c',
    position: 'absolute',
    margin: 30,
    right: 0,
  },
});
