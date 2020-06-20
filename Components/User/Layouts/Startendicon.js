import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

class startendicon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  dot() {
    return <View style={{height: 10, width: 10, borderRadius: 20,backgroundColor:'#000'}} />;
  }
  line(){
    return <View style={{height: 45, width: 1.3,backgroundColor:'#000',opacity:0.4}} />;
  }
  square(){
    return <View style={{height: 10, width:10,backgroundColor:'#e7564c'}} />;
  }
  render() {
    return (
      <View style={{alignItems:"center",margin:10}} >
        {this.dot()}
        {this.line()}
        <Icon name="phone" size={10} color="#e7564c"/>
        {this.line()} 
        {this.square()}
        </View>
    );
  }
}

export default startendicon;
