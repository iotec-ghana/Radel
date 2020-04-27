import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import {Picker} from 'native-base';
const {width, height} = Dimensions.get('window');
export default class AddMomoNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: 'MTN',
      phone: '',
    };
  }
  onValueChange(value) {
    this.setState({
      network: value,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Toolbar icon={'chevron-left'} navigation={this.props.navigation} />
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() =>
              this.props.navigation.navigate('WaitingForMomoPaymentActivity', {
                type: 'momo',
                network: 'MTN',
                number: '0546055647',
              })
            }>
            <Text style={styles.SaveButtonText}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
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
            Select network
          </Text>
          <Picker
            note
            mode="dropdown"
            placeholder="------Select Network------"
            style={{
              width: width,
              margin: 6,
            }}
            selectedValue={this.state.network}
            onValueChange={this.onValueChange.bind(this)}>
            <Picker.Item label="MTN" value="MTN" />
            <Picker.Item label="AirtelTigo" value="AirtelTigo" />
            <Picker.Item label="Vodafone" value="Vodafone" />
          </Picker>
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
            Enter Mobile Number
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            onChangeText={text => this.onemailChange(text)}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 20,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    marginBottom: 15,
  },

  button: {
    width: width,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  saveButton: {
    margin: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 2,
  },
  SaveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
