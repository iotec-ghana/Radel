import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import UserDeliveryLocationHistoryList from './Layouts/UserDeliveryLocationHistoryList';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

export default class EnterDestinationActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.setButton}
            onPress={() =>
              this.props.navigation.navigate('DeliveryDestinationMap')
            }>
            <Text style={styles.setButtonText}>SET DESTINATION</Text>
          </TouchableOpacity>
        </View>
        <View>
          {/* <Toolbar navigate={this.props.navigation} /> */}
          <View behavior="padding" style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder={'Current Location'}
              onFocus={() => this.props.navigation.navigate('destination')}
            />
            <TextInput
              style={styles.input}
              placeholder={'Enter delivery destination'}
              onFocus={() => this.props.navigation.navigate('destination')}
            />

            <SafeAreaView>
              <FlatList
                data={DATA}
                renderItem={({item}) => <UserDeliveryLocationHistoryList />}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 3,
    marginTop: 50,
  },

  input: {
    height: 50,
    padding: 10,
    elevation: 1,
    backgroundColor: '#fafafa',
    marginTop: 10,
  },
  button: {
    width: windowWidth,
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  setButton: {
    margin: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 2,
  },
  setButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
