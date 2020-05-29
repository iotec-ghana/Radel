import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StatusBarColor} from '../../constants';
export default class SelectPaymentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ccLayout = () => {
    return (
      <TouchableOpacity
        style={styles.cc}
        onPress={() => this.props.navigation.navigate('AddCardActivity')}>
        <Icon style={styles.icon} name="credit-card" size={24} />
        <Text style={styles.ccText}> Visa, Mastercard, Amex or Discover</Text>
      </TouchableOpacity>
    );
  };
  mmLayout = () => {
    return (
      <TouchableOpacity
        style={styles.cc}
        onPress={() => {
          this.props.navigation.navigate('AddMomoNumber');
        }}>
        <Icon style={styles.icon} name="mobile" size={24} />
        <Text style={styles.ccText}> Mobile Money</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          icon={'arrow-left'}
          navigation={this.props.navigation}
          body={'Select a new payment method'}
          titleColor={'#000'}
        />
        <StatusBar backgroundColor={StatusBarColor} barStyle="light-content" />

        {/* {this.ccLayout()} */}
        {this.mmLayout()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cc: {
    flexDirection: 'row',
    padding: 20,
  },
  ccText: {
    margin: 4,
    fontSize: 15,
    fontWeight: 'bold',
  },
  icon: {},
});
