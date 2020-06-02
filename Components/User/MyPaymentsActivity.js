import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import {BASE_URL, StatusBarColor} from '../../constants';
const {width, height} = Dimensions.get('window');
import Toolbar from './Layouts/Toolbar';
import {AsyncStorage} from 'react-native';
import MomoCard from './Layouts/MomoCardDefault';
import CreditCardLayout from './Layouts/CreditCardLayout';
import MomoCardOther from './Layouts/MomoCardOther';
import {ScrollView} from 'react-native-gesture-handler';

export default class MyPaymentsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payments: [],
      loading: false,
      cards: [],
      momo: [],
      default: null,
      refreshing: false,
    };
  }

  changeDefaultPayment = async id => {
    try {
      this.setState({loading: true});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);

      const config = {
        headers: {Authorization: `Bearer ${token.user.token}`},
      };
      const response = await axios.get(
        `${BASE_URL}/paymentMethods/${id}`,
        config,
      );
      const payments = response.data;
    } catch (error) {}
  };
  componentDidMount = async () => {
  
    this.loadPayments();
  };

  loadPayments = async () => {
    try {
      this.setState({loading: true});
      this.setState({payments: [], momo: []});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);
      const config = {
        headers: {Authorization: `Bearer ${token.user.token}`},
      };
      const response = await axios.get(BASE_URL + '/paymentMethods/', config);
      const payments = response.data;
      this.setState({payments: [...payments]});

      payments.forEach(element => {
        if (element.paymentType === 'momo') {
          if (element.isDefault) {
            this.setState({default: element});
          } else {
            this.setState({momo: this.state.momo.concat(element)});
          }
        }
        if (element.paymentType === 'card') {
          this.setState({cards: this.state.cards.concat(element)});
        }
      });
      this.setState({
        loading: false,
      });
    } catch (e) {
      console.log(e.message);
      this.setState({loading: false});
    }
  };

  noItemsLayout = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../../assets/empty1.png')} style={styles.img} />
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 18,
            marginTop: 20,
            fontWeight: 'bold',
            opacity: 0.5,
            textAlign: 'center',
          }}>
          You have'nt set up any payment methods yet
        </Text>
      </View>
    );
  };
  onRefresh = async () => {
    this.setState({refreshing: true});
    await this.loadPayments();
    this.setState({refreshing: false});
  };
  paymentlistLayout = () => {
    return (
      <View>
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

        <MomoCard
          network={'MTN'}
          number={'0546055647'}
          item={this.state.default}
        />

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
        <FlatList
          data={this.state.momo}
          renderItem={({item}) => (
            <View>
              <MomoCardOther navigation={this.props.navigation} item={item} />
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  loadinglayout = () => {
    return (
      <ActivityIndicator
        size="large"
        color="#e7564c"
        
      />
    );
  };
  render() {
    const {payments, loading} = this.state;

    return (
      <View style={styles.container}>
        <Toolbar
          icon={'arrow-left'}
          right={'Add Payment Method'}
          JustAddingPayment={true}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
          righSideRoute={'SelectPaymentActivity'}
        />
        <StatusBar backgroundColor={StatusBarColor} barStyle="light-content" />
        <SafeAreaView style={{flex: 1}}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }>
            {loading
              ? this.loadinglayout()
              : payments.length > 0
              ? this.paymentlistLayout()
              : this.noItemsLayout()}
          </ScrollView>
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
});
