import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Toolbar from './Layouts/Toolbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import MomoCard from './Layouts/MomoCard';
import CreditCardLayout from './Layouts/CreditCardLayout';
const DATA = [
  {
    id: 1,
    last4: '3354',
    expdate: '09/25',
    image: 'cc-mastercard',
    color: '#ffaa00',
  },
  {
    id: 2,
    last4: '1488',
    expdate: '01/24',
    image: 'cc-visa',
    color: '#192061',
  },
];
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
              this.props.navigation.navigate('WaitingForMomoPaymentActivity', {
                type: 'momo',
                network: 'MTN',
                number: '0546055647',
              })
            }> 
            <Text style={styles.ConfirmButton}>CONFIRM</Text>
          </TouchableOpacity>
        </View>
        <Toolbar
          icon={'chevron-left'}
          right={'Add Payment Method'}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
          righSideRoute={'SelectPaymentActivity'}
        />
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 0,
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

        <MomoCard network={'MTN'} number={'0546055647'} />
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 12,
            textAlign: 'left',
            marginLeft: 20,
            marginTop: 10,
            marginRight: 20,
            fontWeight: 'bold',
            opacity: 0.5,
          }}>
          Choose a desired payment method. We offer payment methods suitable for
          everyone
        </Text>
        <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={({item}) => <CreditCardLayout item={item} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
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
