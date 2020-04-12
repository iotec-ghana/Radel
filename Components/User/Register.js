import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          //onChangeText={text}
          // defaultValue={text}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          // onChangeText={text}
          // defaultValue={text}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          // onChangeText={text}
          //defaultValue={text}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          // onChangeText={text}
          //defaultValue={text}
        />

        <TouchableOpacity
          style={styles.SignUpButton}
          onPress={this._onPressButton}>
          <Text style={styles.SignUpButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 30,
    padding: 30,
    width: windowWidth,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 15,
  },

  SignUpButton: {
    marginTop: 10,
    backgroundColor: '#4f69a2',
    paddingVertical: 15,
    borderRadius: 3,
  },
  SignUpButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
