import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('window');

export default class AddCardActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: 14,
              marginLeft: 10,
              textAlign: 'left',
              fontWeight: 'bold',
              opacity: 0.5,
            }}>
            Accepted Cards
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon
              name="cc-mastercard"
              size={40}
              color="#ffaa00"
              style={{marginLeft: 30, flex: 2}}
            />
            <Icon name="cc-visa" size={40} color="#192061" style={{flex: 2}} />
            <Icon
              name="cc-discover"
              size={40}
              color="#ffaa00"
              style={{flex: 2}}
            />
            <Icon name="cc-amex" size={40} color="#27AEE3" style={{flex: 2}} />
          </View>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => dosomething()}>
            <Text style={styles.ConfirmButton}>SAVE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toolbar}>
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
              style={{marginLeft: 30, fontSize: 20, fontWeight: 'bold'}}>
              Back
            </Text>
          </View>
        </View>

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 60,
            fontSize: 38,
            marginLeft: 20,
            textAlign: 'left',
            fontWeight: 'bold',
          }}>
          Add Credit Card
        </Text>

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 60,
            fontSize: 15,
            marginLeft: 20,
            textAlign: 'left',
            fontWeight: 'bold',
            opacity: 0.5,
          }}>
          Card Holder Name
        </Text>

        <TextInput
          style={styles.inputNameCard}
          placeholder={'Card holder Name'}
        />

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 10,
            fontSize: 15,
            marginLeft: 20,
            textAlign: 'left',
            fontWeight: 'bold',
            opacity: 0.5,
          }}>
          Card Number
        </Text>

        <TextInput
          style={styles.inputNameCard}
          placeholder={' Card Number'}
          keyboardType={'number-pad'}
        />

        <View style={styles.expcvv}>
          <View style={{flex: 1}}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginTop: 10,
                fontSize: 15,
                marginLeft: 20,
                textAlign: 'left',
                fontWeight: 'bold',
                opacity: 0.5,
              }}>
              Expires
            </Text>
            <TextInput
              style={styles.inputNameCard}
              placeholder={'Expires'}
              keyboardType={'number-pad'}
            />
          </View>

          <View style={{flex: 1}}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                marginTop: 10,
                fontSize: 15,
                marginLeft: 20,
                textAlign: 'left',
                fontWeight: 'bold',
                opacity: 0.5,
              }}>
              CVV
            </Text>
            <TextInput
              style={styles.inputNameCard}
              placeholder={'CVV'}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    flex: 1,
    width: width,
    position: 'absolute',
    top: 0,
    elevation: 5,
    backgroundColor: '#00000000',
  },
  expcvv: {
    flex: 1,
    flexDirection: 'row',
  },
  toolContent: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  back: {
    position: 'absolute',
    left: 0,
    margin: 2,
  },
  inputNameCard: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    marginTop: 5,
    paddingLeft: 10,
    borderColor: '#fafafa',
    borderRadius: 6,
  },
  addpaymet: {
    position: 'absolute',
    right: 0,
    margin: 2,
    color: '#e7564c',
    fontWeight: 'bold',
  },

  button: {
    width: width,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  setButton: {
    margin: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 2,
  },
  ConfirmButton: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
