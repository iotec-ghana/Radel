import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class DriverDetailsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const {motorBrand,licencePlate,text1,text2,riderName} = this.props
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 15}}>
            {text1}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#e7564c',
              fontSize: 14,
              marginTop: 10,
            }}>
          {text2}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 20,
                backgroundColor: '#fafafa',
                borderRadius: 40,
                marginRight: 30,
              }}>
              <Icon name="phone" size={24} color="#000" style={{margin: 2}} />
            </View>
  
            <View style={{}}>
              <Image
                source={require('../../assets/deedat.jpg')}
                style={{height: 100, width: 100, borderRadius: 100}}
              />
            </View>
            <View
              style={{
                padding: 20,
                backgroundColor: '#fafafa',
                borderRadius: 40,
                marginLeft: 30,
              }}>
              <Icon name="phone" size={24} color="#000" style={{}} />
            </View>
          </View>
  
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 16,
              marginTop: 10,
            }}>
            {riderName}
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#000',
              fontSize: 16,
              marginTop: 20,
            }}>
            {licencePlate} - {motorBrand}
          </Text>
        </View>
      );
  }
}

export default DriverDetailsLayout;
