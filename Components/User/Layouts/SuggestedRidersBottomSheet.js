import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import RidersCard from './RidersCard';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
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
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.suggestedText}>Suggested Riders</Text>
        <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={({item}) => <RidersCard data={item} arr={DATA} />}
            keyExtractor={item => item.id}
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
    borderRadius:10,
  },
  suggestedText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
