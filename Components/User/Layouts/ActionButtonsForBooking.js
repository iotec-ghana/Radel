import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

class ActionButtonsForBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      // will refactor later
    const {disabled,text} = this.props;
    return (
      <TouchableOpacity style={styles.bookButton} disabled={disabled}>
        <Text style={styles.bookButtonText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  bookButton: {
    backgroundColor: '#e7564c',
    paddingVertical: 15,
    borderRadius: 3,
    margin: 12,
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default ActionButtonsForBooking;
