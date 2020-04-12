import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.signup}
          onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>Sign Up </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ff8900",

    width: windowWidth,
  },
  buttons: {
    width: windowWidth,
    backgroundColor: '#e7564c',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
    padding: 20,
  },

  signup: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 3,
    marginTop: 10,
  },
  signupText: {
    color: '#ff8900',
    textAlign: 'center',
    fontWeight: 'bold',

    fontSize: 16,
  },
  login: {
    paddingVertical: 15,
    borderRadius: 3,
    marginTop: 10,
    borderColor: '#fff',
    borderWidth: 1,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
