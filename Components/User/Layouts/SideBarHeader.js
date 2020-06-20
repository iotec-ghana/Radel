import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {isSignedIn} from '../../../Actions/authAction';
import {connect} from 'react-redux';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class SideBarHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: '',
    };
  }

  componentDidMount = async () => {
    console.log(this.props.authStatus,"dsf")
    
  };

  render() {
    const {picture} = this.props.authStatus.user;
    const img = '../../../assets/city.jpg';

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ProfileActivity')}>
            {picture !== '' ? (
              <Image style={styles.image} source={{uri: picture}} />
            ) : (
              <Image style={styles.image} source={require(img)} />
            )}
          </TouchableOpacity>
        </View>
        {this.props.authdata.isAuthenticated ? (
          <Text style={styles.nameText}>
            {this.props.authdata.user.first_name}{' '}
            {this.props.authdata.user.last_name}
          </Text>
        ) : null}

        {this.props.authdata.isAuthenticated ? (
          <Text style={styles.idText}>
            {this.props.authdata.user.phone_number}
          </Text>
        ) : null}
        {this.props.authdata.isAuthenticated ? (
          <Text style={styles.idText}>
            {!this.props.authdata.user.isVerified ? (
              <Text style={styles.idText}>Acount not verified </Text>
            ) : null}{' '}
          </Text>
        ) : null}

        {/* <Icon name="verified" size={20} color="#000" style={{margin: 2}} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7564c',
    padding: 40,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },

  idText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
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
  authStatus: state.auth,
  //error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {
    isSignedIn,
  },
)(SideBarHeader);
