/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import RidersCard from './RidersCard';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2u-aed5-3ad53abb28ba',
    price: 35,
    time: '1-5 min',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    price: 55,
    time: '12-15 min',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    price: 75,
    time: '15-25 min',
  },
];

export default class SuggestedRidersBottomSheet extends Component {
  state = {
    itemPressed: DATA[0].id,
  };
  typeSelected(value) {
    //.alert(value);
    this.setState({
      itemPressed: value,
    });
  }
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.suggestedText}>Suggested Riders</Text>
        <SafeAreaView>
          <FlatList
            data={this.props.riders}
            renderItem={({item}) => (
              // <RidersCard data={item} price={this.props.price} arr={DATA} />
              <TouchableOpacity
                // eslint-disable-next-line react-native/no-inline-styles
                onPress={() => this.typeSelected(item.riderEmail)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 10,
                  margin: 2,
                  borderRadius: 5,
                  borderColor:
                    this.state.itemPressed === item.riderEmail
                      ? '#e7564c'
                      : 'black',
                  borderWidth:
                    this.state.itemPressed === item.riderEmail ? 2 : 0,
                }}>
                <View style={styles.radelGo}>
                  <Text style={styles.radelGoText}>RadelGO</Text>

                  {this.state.riders.indexOf(item) === 0 ? (
                    <Text style={styles.bestText}>Best Save</Text>
                  ) : null}

                  <View style={styles.PriceTime}>
                    {this.props.loading ? (
                      <ActivityIndicator size="small" color="#e7564c" />
                    ) : (
                      <Text style={styles.price}>GHC{this.props.price}</Text>
                    )}

                    <Icon
                      name="navigation-2"
                      size={14}
                      color="#000"
                      style={{margin: 2}}
                    />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>

                <Image
                  source={require('../../../assets/motor.png')}
                  style={{
                    height: DATA.indexOf(item) === 0 ? 80 : 50,
                    width: DATA.indexOf(item) === 0 ? 80 : 50,
                    margin: 5,
                    position: 'absolute',
                    right: 0,
                  }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.riderEmail}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 12,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 10,
  },
  suggestedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radelGo: {
    padding: 2,
  },
  radelGoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  bestText: {
    color: '#ffaa00',
    fontSize: 12,
    marginBottom: 5,
  },
  PriceTime: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',

    justifyContent: 'center',
    flexWrap: 'wrap',
    height: 18,
  },
  price: {
    fontSize: 14,
    color: '#e7564c',
    marginRight: 7,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,

    fontWeight: 'bold',
  },
});
