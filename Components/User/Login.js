import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
const windowWidth = Dimensions.get("window").width;
export default class Login extends Component {
  state = {
    text: "",
  };

  render() {
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
         // onChangeText={text}
         
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
         // onChangeText={text}
          
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => this.props.navigation.navigate('Main')}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={{ textAlign: "center", marginTop: 20,fontWeight:"bold", }}>
          Forgot Password?
        </Text>
        <Text style={{ textAlign: "center", marginTop: 20 ,fontWeight:"bold",}}>Or</Text>

        <TouchableOpacity style={styles.fb} onPress={this._onPressButton}>
          <Text style={styles.fbText}>Sign Up with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.google} onPress={this._onPressButton}>
          <Text style={styles.googleText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.normalSignUpButton} onPress={this._onPressButton}>
          <Text style={styles.normalSignUpButtonText}>Sign Up with Username and Password</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    marginTop: 30,
    padding: 30,
    width: windowWidth,
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: "#fafafa",
    marginBottom: 15,
  },
 
  loginButton: {
    marginTop: 10,

    backgroundColor: "#4f69a2",
    paddingVertical: 15,
    borderRadius: 3,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontWeight:"bold",
  },
  fb: {
    marginTop: 18,

    backgroundColor: "#4f69a2",
    paddingVertical: 15,
    borderRadius: 3,
  },
  fbText: {
    color: "#fff",
    textAlign: "center",
    fontWeight:"bold",
  },
  google: {
    marginTop: 13,

    backgroundColor: "#e7564c",
    paddingVertical: 15,
    borderRadius: 3,
  },
  googleText: {
    color: "#fff",
    textAlign: "center",
    fontWeight:"bold",
    
  },
  normalSignUpButton:{
    marginTop: 13,

    backgroundColor: "#fafafa",
    paddingVertical: 15,

    borderRadius: 3,
  },
  normalSignUpButtonText:{
    color: "#000000",
    fontWeight:"bold",
    textAlign: "center",
  }
});
