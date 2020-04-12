import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';

export default class BottomSheet extends Component {
  render() {
    return (
      <View style={styles.main}>
        <View behavior="padding" style={styles.container}>
          <Text style={styles.Looking}>Looking for a delivery guy?</Text>
          <Text style={styles.book}>
            Book on demand or pre-schedule a delivery
          </Text>
          <TextInput
            style={styles.input}
            placeholder={'Enter delivery destination'}
            onFocus={() => this.props.navigation.navigate('destination')}
          />
           
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
    marginBottom: 10,
  },
});
