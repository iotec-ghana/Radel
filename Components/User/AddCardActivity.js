import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toolbar from './Layouts/Toolbar';
import {AsyncStorage} from 'react-native';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
import {BASE_URL} from '../../constants';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-input-credit-card';

export default class AddCardActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      valid: false,
      values: {
        // will be in the sanitized and formatted form
        number: '',
        expiry: '',
        cvc: '',
        type: '', // will be one of [null, "visa", "master-card", "american-express", "diners-club", "discover", "jcb", "unionpay", "maestro"]
        name: '',
      },
    };
  }
  _onChange = form => {
    this.setState({
      ...form,
    });
    console.log(this.state.values);
  };

  onSubmit = async () => {
    try {
      this.setState({loading: true});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);
      console.log(token.user.token);
      if (this.state.valid) {
        //set header authorization token
        const config = {
          headers: {Authorization: `Bearer ${token.user.token}`},
        };
        this.setState({loading: true});

        const payload = {
          type: 'card',
          details: {
            ...this.state.values,
          },
        };
        const response = await axios.post(
          BASE_URL + '/createPayment/',
          payload,
          config,
        );
        console.log(response.data);
        this.props.navigation.navigate('PaymentMethodsActivity');
      } else {
        alert('please select a network');
      }
      this.setState({loading: false});
    } catch (e) {
      console.log(e.message);
      alert('there was a problem');
      this.setState({loading: false}); 
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}>
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
          <View style={{ flexDirection: 'row',flexWrap: "wrap"}}>
            <Icon
              name="cc-mastercard"
              size={40}
              color="#ffaa00"
              style={{flexGrow: 2,textAlign:"center"}}
            />
            <Icon
              name="cc-visa"
              size={40}
              color="#192061"
              style={{flexGrow: 2,textAlign:"center"}}
            />
            <Icon
              name="cc-discover"
              size={40}
              color="#ffaa00"
              style={{flexGrow: 2,textAlign:"center"}}
            />
            <Icon
              name="cc-amex"
              size={40}
              color="#27AEE3"
              style={{flexGrow: 2,textAlign:"center"}}
            />
          </View>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() => this.onSubmit()}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.SaveButtonText}>SAVE</Text>
            )}
          </TouchableOpacity>
        </View>
        <Toolbar
          icon={'arrow-left'}
          rightTextColor={'#e7564c'}
          navigation={this.props.navigation}
        />
        <CreditCardInput
          cardScale={1}
          allowScroll={true}
          requiresName
          onChange={this._onChange}
        />
      </KeyboardAvoidingView>
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
  SaveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
