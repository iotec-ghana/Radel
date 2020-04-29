import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MomoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <Image
          source={require('../../../assets/momo.png')}
          style={styles.img}
        />
        <View style={styles.misc}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 4}}>
            Mobile Money Payment
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
            Default Method
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
            {this.props.network}: {this.props.number}
          </Text>
        </View>

        <View style={styles.tickWrapper}>
          <Icon name="check" size={14} color="#fff" style={{margin: 2}} />
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
    borderColor: '#e7564c',
    borderWidth: 2,

    // justifyContent: 'center',
    // alignContent: 'center',
  },
  img: {
    height: 50,
    width: 50,
    marginRight: 10,
  },

  misc: {
    flex: 1,
    margin: 3,
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
