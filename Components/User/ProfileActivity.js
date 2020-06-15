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
import {isSignedIn} from '../../Actions/authAction';
import {connect} from 'react-redux';
import {Toast} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
class ProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      loading: false,
      error: '',
      editPressed: false,
      fname: '',
      lname: '',
      email: '',
      number: '',
      oldpassword: '',
      newpassword: '',
      imageUri: null,
      passwordVisible1: false,
      passwordVisible2: false,
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
  onPasswordVisibilityToggle1() {
    this.setState({
      passwordVisible1: !this.state.passwordVisible1,
    });
  }
  onPasswordVisibilityToggle2() {
    this.setState({
      passwordVisible2: !this.state.passwordVisible2,
    });
  }
  async componentDidMount() {
    console.log(this.props.authStatus);
    const {first_name, last_name, phone_number, email} = this.props.authStatus;
    this.setState({
      fname: first_name,
      lname: last_name,
      email: email,
      phone: phone_number,
    });
  }
  render() {
    const img = '../../assets/city.jpg';
    const {
      editable,
      loading,
      error,
      editPressed,
      imageUri,
      fname,
      lname,
      email,
      phone,
      passwordVisible1,
      passwordVisible2,
    } = this.state;
    return (
      <View style={styles.container}>
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
            Information
          </Text>
          <TouchableOpacity
            disabled={!editable}
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
            defaultValue={fname}
          />
          <TextInput
            style={styles.inputl}
            placeholder="Last Name"
            editable={editable}
            keyboardType={'default'}
            defaultValue={lname}
          />
        </View>
        <TextInput
          style={styles.inputDisabled}
          placeholder="Email"
          editable={false}
          onChangeText={text => this.onEmailChange(text)}
          defaultValue={email}
        />

        <TextInput
          style={styles.inputDisabled}
          placeholder="Phone Number"
          editable={false}
          keyboardType={'number-pad'}
          maxLength={10}
          defaultValue={phone}
        />
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fafafa',
            borderRadius: 3,
            elevation: 0,
            borderColor: '#8f9883',
            borderWidth: 1.2,
            marginBottom: 15,
            marginHorizontal: 30,
          }}>
          <TextInput
            style={styles.inputPassword}
            placeholder="Old password"
            secureTextEntry={!passwordVisible1}
            editable={editable}
            onChangeText={text => this.onOldPasswordChange(text)}
          />
          <TouchableOpacity onPress={() => this.onPasswordVisibilityToggle1()}>
            {passwordVisible1 ? (
              <Icon
                name="eye-off"
                style={styles.eyeIcon}
                color="#8f9883"
                size={24}
              />
            ) : (
              <Icon
                name="eye"
                style={styles.eyeIcon}
                color="#8f9883"
                size={24}
              />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fafafa',
            borderRadius: 3,
            elevation: 0,
            borderColor: '#8f9883',
            borderWidth: 1.2,
            marginBottom: 15,
            marginHorizontal: 30,
          }}>
          <TextInput
            style={styles.inputPassword}
            placeholder="New password"
            secureTextEntry={!passwordVisible2}
            editable={editable}
            onChangeText={text => this.onNewPasswordChange(text)}
          />
          <TouchableOpacity onPress={() => this.onPasswordVisibilityToggle2()}>
            {passwordVisible2 ? (
              <Icon
                name="eye-off"
                style={styles.eyeIcon}
                color="#8f9883"
                size={24}
              />
            ) : (
              <Icon
                name="eye"
                style={styles.eyeIcon}
                color="#8f9883"
                size={24}
              />
            )}
          </TouchableOpacity>
        </View>
        {loading ? <ActivityIndicator size="large" color="#e7564c" /> : null}
        {!error == '' ? (
          <View style={styles.error}>
            <Icon name="alert-circle" size={18} color="#e7564c" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <View style={{position: 'absolute', bottom: 0, width: windowWidth}}>
          {editPressed ? (
            <TouchableOpacity
              style={styles.UpdateButton}
              onPress={
                () => {}
                // this.props.navigation.navigate('PhoneVerificationActivity')
                // this.onSubmit()
              }>
              <Text style={styles.UpdateButtonText}>Update Information</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.UpdateButton}
              onPress={() => {
                this.setState({editPressed: !editPressed, editable: !editable});
                Toast.show({
                  text: 'You can now edit your profile',
                  buttonText: 'Okay',
                  duration: 3000,
                  type: 'warning',
                  position: 'top',
                });
              }}>
              <Text style={styles.UpdateButtonText}> Edit Profile </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  eyeIcon: {
    padding: 10,
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

  inputPassword: {
    height: 50,
    padding: 10,
    borderRadius: 4,
    borderRadius: 3,
    flex: 1,
    backgroundColor: '#fafafa',
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
    backgroundColor: '#8f9883',
    color: '#fafafa',
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
    backgroundColor: '#fafafa',
  },
  inputl: {
    height: 50,
    padding: 10,
    backgroundColor: '#fafafa',
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
    backgroundColor: '#e7564c',
    paddingVertical: 20,
    //borderRadius: 3,
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
const mapStateToProps = state => ({
  authStatus: state.auth.user,
  //error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {
    isSignedIn,
  },
)(ProfileActivity);
