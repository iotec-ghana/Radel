import React, {Component} from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Title,
  Text,
} from 'native-base';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import xICon from '../../../assets/x.png';
export default class Toolbar extends Component {
  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Main')}>
              <Image
                source={require('../../../assets/x.png')}
                style={{height: 24, width: 24}}
              />
              {/* <xICon width={24} height={24} /> */}

              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    elevation: 0,
    backgroundColor: '#fff',
  },
});
