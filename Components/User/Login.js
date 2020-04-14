import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
const windowWidth = Dimensions.get('window').width;
export default class Login extends Component {
  state = {
    text: '',
  };

  render() {
    const {text} = this.state;
    return (
      <View>
        <Toolbar
          icon={'chevron-left'}
          right={'Sign Up'}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
          righSideRoute={'SignUp'}
        />
        <View style={styles.container}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 40,
              marginTop: 0,
              textAlign: 'left',
              fontWeight: 'bold',
            }}>
            Log in
          </Text>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 12,
              marginBottom: 4,
              opacity: 0.5,
            }}>
            Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"

            // onChangeText={text}
          />
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 15,
              marginTop: 0,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 7,
              marginBottom: 4,
              opacity: 0.5,
            }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            // onChangeText={text}
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Main')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text
            style={{textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>
            Forgot Password?
          </Text>
          <Text
            style={{textAlign: 'center', marginTop: 20, fontWeight: 'bold'}}>
            Or
          </Text>

          <TouchableOpacity style={styles.fb} onPress={this._onPressButton}>
            <Text style={styles.fbText}>Sign Up with Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.google} onPress={this._onPressButton}>
            <Text style={styles.googleText}>Sign Up with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.normalSignUpButton}
            onPress={this._onPressButton}>
            <Text style={styles.normalSignUpButtonText}>
              Sign Up with Username and Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    width: windowWidth,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 15,
  },

  loginButton: {
    marginTop: 10,

    backgroundColor: '#4f69a2',
    paddingVertical: 15,
    borderRadius: 3,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fb: {
    marginTop: 18,

    backgroundColor: '#4f69a2',
    paddingVertical: 15,
    borderRadius: 3,
  },
  fbText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  google: {
    marginTop: 13,

    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 3,
  },
  googleText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  normalSignUpButton: {
    marginTop: 13,

    backgroundColor: '#fafafa',
    paddingVertical: 15,

    borderRadius: 3,
  },
  normalSignUpButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
