import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import MomoCard from './Layouts/MomoCard';
export default class PaymentMethodsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() =>
              this.props.navigation.navigate('DeliveryDestinationMap')
            }>
            <Text style={styles.ConfirmButton}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.toolbar}>
          <View style={styles.toolContent}>
            <Icon name="times" size={20} color="#000" style={styles.back} />
            <Text style={styles.addpaymet}>Add Payment Method</Text>
          </View>
        </View>

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 70,
            fontSize: 38,
            marginLeft: 20,
            textAlign: 'left',
            fontWeight: 'bold',
          }}>
          Payment Methods
        </Text>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 18,
            textAlign: 'left',
            marginLeft: 20,
            marginTop: 20,
            fontWeight: 'bold',
            opacity: 0.5,
          }}>
          Current Method
        </Text>

        <MomoCard />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  toolbar: {
    flex: 1,
    width: width,
    position: 'absolute',
    top: 0,
    elevation: 5,
    backgroundColor: '#00000000',
  },
  toolContent: {
    flex: 1,
    flexDirection: 'row',

    padding: 10,
    margin: 20,
  },
  back: {
    position: 'absolute',
    left: 0,
    margin: 2,
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
