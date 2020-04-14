import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const windowWidth = Dimensions.get('window').width;
import Toolbar from './Layouts/Toolbar';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Toolbar
          icon={'chevron-left'}
          right={'Log in'}
          rightTextColor={'#e7564c'}
          routeBack={'Home'}
          navigation={this.props.navigation}
          righSideRoute={"Login"}
        />
        <View style={styles.container}>
          {/* <View style={styles.toolbar}>
          <View style={styles.toolContent}>
            <Icon
              name="chevron-left"
              size={20}
              color="#000"
              style={styles.back}
            />
            <Text 
              onPress={() =>
                this.props.navigation.navigate('PaymentMethodsActivity')
              }
              style={{marginLeft: 20, fontSize: 20, fontWeight: 'bold'}}>
              Back
            </Text>
          </View>
        </View>
        */}
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 40,
              marginTop: 0,
              marginBottom: 12,
              textAlign: 'left',
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            Sign up
          </Text>
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
            placeholder="Phone Number"
            // onChangeText={text}
            //defaultValue={text}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            // onChangeText={text}
            //defaultValue={text}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            // onChangeText={text}
            //defaultValue={text}
          />

          <TouchableOpacity
            style={styles.SignUpButton}
            onPress={this._onPressButton}>
            <Text style={styles.SignUpButtonText}>Register</Text>
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

  toolbar: {
    flex: 1,
    width: windowWidth,
    position: 'absolute',
    top: 0,
    elevation: 5,
    backgroundColor: '#00000000',
  },

  toolContent: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
});
