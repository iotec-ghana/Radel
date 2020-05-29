import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class BottomSheet extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View behavior="padding" style={styles.container}>
          <Text style={styles.Looking}>Looking for a delivery guy?</Text>
          <Text style={styles.book}>
            Book on demand or pre-schedule a delivery
          </Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fafafa',
              borderRadius: 5,
              elevation: 0,
            }}>
            <TextInput
              style={styles.input}
              placeholder={'Enter delivery destination'}
              onFocus={() => this.props.navigation.navigate('destination')}
              underlineColorAndroid="transparent"
            />
            <Icon
              name="search"
              style={styles.searchIcon}
              color="#e7564c"
              size={24}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,

  },
  searchIcon: {
    padding: 10,
  },
  container: {
    flex: 13,
    alignContent: 'center',
    margin: 20,

    // borderRadius: 10,
  },
  Looking: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  book: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 10,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
    flex: 1,
    borderRadius:5
  },
});
