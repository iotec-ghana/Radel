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
import Icon from 'react-native-vector-icons/FontAwesome';
import RidersCard from './RidersCard';
import {connect} from 'react-redux';
import {getSelectedRider} from '../../../Actions/SelectRiderAction';

class SuggestedRidersBottomSheet extends Component {
  state = {
    itemPressed: this.props.riders[0].riderid,
  };
  typeSelected(value, details) {
    this.setState({
      itemPressed: value,
    });
    this.props.getSelectedRider(details);
    console.log('selected' + JSON.stringify(details));
  }
  componentDidMount() {
    //console.log(this.props.riders[0]);
    this.props.getSelectedRider(this.props.riders[0]);
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
                onPress={() => this.typeSelected(item.riderid, item)}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  padding: 10,
                  margin: 2,
                  borderRadius: 5,
                  borderColor:
                    this.state.itemPressed === item.riderid
                      ? '#e7564c'
                      : 'black',
                  borderWidth:
                    this.state.itemPressed === item.riderid ? 2 : 0,
                }}>
                <View style={styles.radelGo}>
                  <Text style={styles.radelGoText}>RadelGO</Text>

                  {this.props.riders.indexOf(item) === 0 ? (
                    <Text style={styles.bestText}>Best Save</Text>
                  ) : null}

                  <View style={styles.PriceTime}>
                    {this.props.loading ? (
                      <ActivityIndicator size="small" color="#e7564c" />
                    ) : (
                      <Text style={styles.price}>GHC{this.props.price}</Text>
                    )}

                    <Icon
                      name="clock-o"
                      size={14}
                      color="#000"
                      style={{margin: 2}}
                    />
                    <Text style={styles.time}>{item.eta.toFixed(0)} minutes away</Text>
                  </View>
                </View>

                <Image
                  source={require('../../../assets/motor.png')}
                  style={{
                    height: this.props.riders.indexOf(item) === 0 ? 80 : 50,
                    width: this.props.riders.indexOf(item) === 0 ? 80 : 50,
                    margin: 5,
                    position: 'absolute',
                    right: 0,
                  }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={item => item.riderid}
          />
        </SafeAreaView>
      </View>
    );
  }
}

export default connect(
  null,
  {getSelectedRider},
)(SuggestedRidersBottomSheet);
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
