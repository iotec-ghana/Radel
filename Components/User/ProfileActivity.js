import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import Toolbar from './Layouts/Toolbar';
import * as ImagePicker from 'expo-image-picker';
const windowWidth = Dimensions.get('window').width;
import {StatusBarColor} from '../../constants';
import Constants from 'expo-constants';
export default class ProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      loading: false,
      error: '',
      editPressed: false,
      fname: '',
      lname: '',
      oldpassword: '',
      newpassword: '',
      imageUri: null,
    };
  }
  onFirstnameChange = fname => {
    this.setState({
      fname: fname,
    });
  };
  onLastnameChange = lname => {
    this.setState({
      lname: lname,
    });
  };
  onEmailChange = email => {
    this.setState({email: email});
  };
  onPhoneChange = phone => {
    this.setState({phone: phone});
  };
  pickImage = async () => {
    if (Constants.platform.ios) {
      const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({imageUri: result.uri});
    }
  };
  onOldPasswordChange = pass => {
    this.setState({oldpassword: pass});
  };
  onNewPasswordChange = pass => {
    this.setState({newpassword: pass});
  };
  render() {
    const img = '../../assets/city.jpg';
    const {editable, loading, error, editPressed, imageUri} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Toolbar
          icon={'arrow-left'}
          routeBack={'Home'}
          navigation={this.props.navigation}
        />
        <StatusBar backgroundColor={StatusBarColor} barStyle="light-content" />

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontSize: 40,
              marginTop: 0,
              marginBottom: 12,
              textAlign: 'left',
              fontWeight: 'bold',
              marginLeft: 30,
              marginRight: 30,
            }}>
            Update {'\n'}
            Informations
          </Text>
          <TouchableOpacity
            disabled={editable}
            style={{alignItems: 'center'}}
            onPress={() => this.pickImage()}>
            <Image style={styles.image} source={{uri: imageUri}} />
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', marginLeft: 30, marginRight: 30}}>
          <TextInput
            style={styles.inputf}
            placeholder="First Name"
            editable={editable}
            onChangeText={text => this.onFirstnameChange(text)}
            // defaultValue={text}
          />
          <TextInput
            style={styles.inputl}
            placeholder="Last Name"
            editable={editable}
            keyboardType={'default'}

            // defaultValue={text}
          />
        </View>
        <TextInput
          style={styles.inputDisabled}
          placeholder="Email"
          editable={false}
          onChangeText={text => this.onEmailChange(text)}
          // defaultValue={text}
        />

        <TextInput
          style={styles.inputDisabled}
          placeholder="Phone Number"
          editable={false}
          keyboardType={'number-pad'}
          maxLength={10}
          //defaultValue={text}
        />
        <TextInput
          style={styles.input}
          placeholder="Old password"
          secureTextEntry={true}
          editable={editable}
          onChangeText={text => this.onOldPasswordChange(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="New password"
          secureTextEntry={true}
          editable={editable}
          onChangeText={text => this.onNewPasswordChange(text)}
        />

        {loading ? <ActivityIndicator size="large" color="#e7564c" /> : null}
        {!error == '' ? (
          <View style={styles.error}>
            <Icon name="alert-circle" size={18} color="#e7564c" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {editPressed ? (
          <TouchableOpacity
            style={styles.UpdateButton}
            onPress={() =>
              // this.props.navigation.navigate('PhoneVerificationActivity')
              this.onSubmit()
            }>
            <Text style={styles.UpdateButtonText}>Update Information</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.UpdateButton}
            onPress={() =>
              this.setState({editPressed: !editPressed, editable: !editable})
            }>
            <Text style={styles.UpdateButtonText}> Edit Profile </Text>
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  input: {
    height: 50,
    padding: 10,
    borderColor: '#8f9883',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    borderRadius: 3,
    marginLeft: 30,
    marginRight: 30,
  },
  inputDisabled: {
    height: 50,
    padding: 10,
    borderColor: '#8f9883',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    borderRadius: 3,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#989898',
  },
  inputf: {
    height: 50,
    padding: 10,
    marginBottom: 15,
    marginRight: 8,
    borderRadius: 3,
    flex: 1,
    borderColor: '#8f9883',
    borderWidth: 1,
    borderRadius: 4,
  },
  inputl: {
    height: 50,
    padding: 10,

    marginBottom: 15,
    borderRadius: 3,
    flex: 1,
    borderColor: '#8f9883',
    borderWidth: 1,
    borderRadius: 4,
  },
  error: {
    flexDirection: 'row',
    marginTop: 7,
    padding: 15,
    borderColor: '#e7564c',
    borderWidth: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  errorText: {
    marginLeft: 8,
    color: '#e7564c',
    fontSize: 14,
    fontWeight: 'bold',
  },
  UpdateButton: {
    marginTop: 10,
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 3,
    marginLeft: 30,
    marginRight: 30,
  },
  UpdateButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    borderColor: '#fff',
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 100,
  },
});
