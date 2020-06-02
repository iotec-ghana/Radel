import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class MomoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.item) {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            this.props.price
              ? Alert.alert(
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
                            receipientPhone: this.props.route.params
                              .receipientPhone,
                            locationNames: this.props.route.params
                              .locationNames,
                            price: this.props.route.params.price,
                            riderDetails: this.props.route.params.riderDetails,
                          },
                        ),
                    },
                  ],
                  {cancelable: false},
                )
              : null;
          }}>
          {this.props.item.details.network === 'MTN' ? (
            <Image
              source={require('../../../assets/mtn.png')}
              style={styles.img}
            />
          ) : this.props.item.details.network === 'AirtelTigo' ? (
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
            <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 0}}>
              Mobile Money Payment
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
              Default Method
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12, opacity: 0.5}}>
              {this.props.item.details.network.toUpperCase()}:{' '}
              {this.props.item.details.number}
            </Text>
          </View>

          <View style={styles.tickWrapper}>
            <Icon name="check" size={14} color="#fff" style={{margin: 2}} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
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
    borderColor: '#e7564c',
    borderWidth: 2,

    // justifyContent: 'center',
    // alignContent: 'center',
  },
  img: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 50,
  },

  misc: {
    flex: 1,
    margin: 3,
  },

  tickWrapper: {
    padding: 2,
    borderRadius: 4,
    backgroundColor: '#e7564c',
    position: 'absolute',
    margin: 30,
    right: 0,
  },
});
