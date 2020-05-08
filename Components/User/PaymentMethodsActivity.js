import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import Toolbar from './Layouts/Toolbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {BASE_URL} from '../../constants';
import MomoCard from './Layouts/MomoCardDefault';
import CreditCardLayout from './Layouts/CreditCardLayout';
import MomoCardOther from './Layouts/MomoCardOther';
import {ScrollView} from 'react-native-gesture-handler';

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
    this.state = {
      cards: [],
      momo: [],
      payments: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    try {
      this.setState({loading: true});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);

      const config = {
        headers: {Authorization: `Bearer ${token.user.token}`},
      };
      const response = await axios.get(BASE_URL + '/paymentMethods/', config);
      const payments = response.data;

      payments.forEach(element => {
        if (element.paymentType === 'momo') {
          this.setState({momo: this.state.momo.concat(element)});
        }
        if (element.paymentType === 'card') {
          this.setState({cards: this.state.cards.concat(element)});
        }
      });

      this.setState({
        loading: false,
      });

      console.log(JSON.stringify(this.state.momo));
    } catch (e) {}
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.button}>
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
        </View> */}
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

        {this.state.loading ? (
          <ActivityIndicator size="large" color="#e7564c" />
        ) : (
          <SafeAreaView style={{flex: 1}}>
            <ScrollView>
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
                Choose a desired payment method. We offer payment methods
                suitable for everyone
              </Text>
              {/* <FlatList
                data={this.state.cards}
                renderItem={({item}) => (
                  <View>
                    <CreditCardLayout item={item} />
                  </View>
                )}
                keyExtractor={item => item.id}
              /> */}

              <FlatList
                data={this.state.momo}
                renderItem={({item}) => (
                  <View>
                    <MomoCardOther
                      navigation={this.props.navigation}
                      route={this.props.route}
                      item={item}
                      price={this.props.route.params.price}
                      riderDetails={this.props.route.params.riderDetails}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
