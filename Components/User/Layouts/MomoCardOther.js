/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MomoCardOther extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.item.thumbnail);
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          Alert.alert(
            'Confirm',
            `proceed to pay with ${this.props.item.details.number}?`,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () =>
                  this.props.navigation.navigate(
                    'WaitingForMomoPaymentActivity',
                    {
                      type: 'momo',
                      network: this.props.item.details.network,
                      number: this.props.item.details.number,
                      receipientPhone: this.props.route.params.receipientPhone,
                      price: this.props.route.params.price,
                      riderDetails: this.props.route.params.riderDetails,
                    },
                  ),
              },
            ],
            {cancelable: false},
          )
        }>
        {this.props.item.details.network === 'mtn' ? (
          <Image
            source={require('../../../assets/mtn.png')}
            style={styles.img}
          />
        ) : this.props.item.network === 'airtel' ? (
          <Image
            source={require('../../../assets/airtel.jpg')}
            style={styles.img}
          />
        ) : (
          <Image
            source={require('../../../assets/vodafone.png')}
            style={styles.img}
          />
        )}

        <View style={styles.misc}>
          <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 4}}>
            Mobile Number
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
            {this.props.item.details.number}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#fafafa',
    // borderColor: '#e7564c',
    // borderWidth: 2,

    // justifyContent: 'center',
    // alignContent: 'center',
  },

  misc: {
    flex: 1,
    marginLeft: 10,
  },

  tickWrapper: {
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#e7564c',
    position: 'absolute',
    margin: 30,
    right: 0,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
});
