import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
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
    //console.log(this.props.authStatus,"dsf")
  };

  render() {
    if (this.props.authStatus.user) {
      const {
        //picture,
        first_name,
        last_name,
        phone_number,
        isVerified,
        picture,
      } = this.props.authStatus.user;
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
          {this.props.authStatus.isAuthenticated ? (
            <Text style={styles.nameText}>
              {first_name} {last_name}
            </Text>
          ) : null}

          {this.props.authStatus.isAuthenticated ? (
            <Text style={styles.idText}>{phone_number}</Text>
          ) : null}
          {this.props.authStatus.isAuthenticated ? (
            <TouchableOpacity>
              <Text style={styles.idText}>
                {!isVerified ? (
                  <Text style={styles.idText}>Acount not verified </Text>
                ) : null}{' '}
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* <Icon name="verified" size={20} color="#000" style={{margin: 2}} /> */}
        </View>
      );
    } else return <ActivityIndicator size="large" color="#e7564c" />;
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
