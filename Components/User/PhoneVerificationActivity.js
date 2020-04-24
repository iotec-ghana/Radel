import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {isSignedIn} from '../../Actions/authAction';
import {connect} from 'react-redux';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {View} from 'native-base';
import Toolbar from './Layouts/Toolbar';
const windowWidth = Dimensions.get('window').width;

const CELL_COUNT = 4;
validatePhoneNumber = () => {
  var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
  return regexp.test(this.state.phone);
};
const verifyPhone = async => {};
function PhoneVerificationActivity({navigation}) {
  verifyPhone();
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View style={styles.main}>
      <View style={styles.button}>
        <TouchableOpacity
          style={styles.setButton}
          onPress={() => navigation.navigate('GetStartedActivity')}>
          <Text style={styles.setButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
      <Toolbar
        icon={'chevron-left'}
        routeBack={'Home'}
        navigation={navigation}
        righSideRoute={'Login'}
      />
      <View style={styles.container}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 40,
            marginTop: 0,
            textAlign: 'left',
            fontWeight: 'bold',
          }}>
          Verify phone number
        </Text>

        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            fontSize: 13,
            marginTop: 0,
            textAlign: 'left',
            fontWeight: 'bold',
          }}>
          Check your SMS messages. We've sent you the PIN at 054606532
        </Text>
        <SafeAreaView style={styles.root}>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </SafeAreaView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    padding: 20,
    width: windowWidth,
  },
  root: {flex: 1, padding: 0},

  codeFiledRoot: {marginTop: 30},
  cell: {
    width: windowWidth / 5,
    height: 100,
    lineHeight: 100,
    fontSize: 54,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
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
const mapStateToProps = state => ({
  authStatus: state.auth.isAuthenticated,
  error: state.auth.error,
});
export default connect(
  mapStateToProps,
  {isSignedIn},
)(PhoneVerificationActivity);
