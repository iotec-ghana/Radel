import React, {Component} from 'react';
import {View, Text, StyleSheet, Image,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SideBarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: '',
      name: '',
      number: '',
      verified: false,
    };
  }

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('authdata');
    const user = JSON.parse(data);
    this.setState({
      name: user.user.first_name + ' ' + user.user.last_name,
      number: user.user.phone_number,
      verified: user.user.isVerified,
    });
  };

  render() {
    const img = '../../../assets/deedat.jpg';
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
           translucent={true}
          backgroundColor={'transparent'}
        />
        <Image style={styles.image} source={require(img)} />
        <Text style={styles.nameText}> {this.state.name} </Text>
        <Text style={styles.idText}> {this.state.number} </Text>
        <Text style={styles.idText}>
          {' '}
          {!this.state.verified ? (
            <Text style={styles.idText}>
              {' '}
              Please tap here to verify your account{' '}
            </Text>
          ) : null}{' '}
        </Text>
        {/* <Icon name="verified" size={20} color="#000" style={{margin: 2}} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7564c',
    padding: 40,
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
