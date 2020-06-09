import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import {Root} from 'native-base';
import RootComponent from './Components/RootComponent';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    //this.loadAssetsAsync();
  }
  loadAssetsAsync = async () => {
    await Font.loadAsync({
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
    });
    this.setState({fontLoaded: true});
  };

  render() {
    console.disableYellowBox = true;
    // if (!this.state.fontLoaded) {
    //   return <Text>loading font</Text>;
    // } else {
      return (
        <Root>
          <Provider store={store}>
            <RootComponent />
          </Provider>
        </Root>
      );
    }
  }


export default App;
