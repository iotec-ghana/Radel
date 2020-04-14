import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SideBarItems extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon name={this.props.item.icon} size={15} />
        <Text style={styles.text}>{this.props.item.text}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 4,
    margin:20
  },

  text: {
    fontSize: 15,
    marginLeft: 14,
    fontWeight:'bold'
  },
});
