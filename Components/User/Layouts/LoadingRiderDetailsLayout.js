import React, { Component } from 'react';
import { View, Text,Image } from 'react-native';

class LoadingRiderDetailsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            source={require('../../../assets/spinner.gif')}
            style={{height: 100, width: 100}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            WE ARE PROCESSING YOUR BOOKING
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 14, marginTop: 20}}>
            Your rider will be there soon
          </Text>
        </View>
      );
  }
}

export default LoadingRiderDetailsLayout;
