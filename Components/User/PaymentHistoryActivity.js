import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity } from 'react-native';

export default class PaymentHistoryActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  card=()=>{
      return(<TouchableOpacity>
          
      </TouchableOpacity>)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> PaymentHistoryActivity </Text>
      </View>
    );
  }
}
const styles= StyleSheet.create({
    container:{
        flex:1
    }
})
