import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

export default class SideBarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const img = '../../../assets/deedat.jpg';
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require(img)} />
        <Text style={styles.nameText}> {this.props.name} </Text>
        <Text style={styles.idText}> {this.props.phone} </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7564c',
    padding: 15,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  idText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },

  image: {
    borderColor: '#fff',
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 100,
  },
});
