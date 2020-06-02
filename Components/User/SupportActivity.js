import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Toolbar from './Layouts/Toolbar';

export default class SupportActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Toolbar icon={'arrow-left'} navigation={this.props.navigation} />
        <Text style={{fontSize:30}}>
          {' '}
          Contact us on : 0554891929{' '}
        </Text>
      </View>
    );
  }
}
