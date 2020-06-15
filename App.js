import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text,Image} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import * as Font from 'expo-font';
import {Root} from 'native-base';
import RootComponent from './Components/RootComponent';
import * as Analytics from 'expo-firebase-analytics';
import {AppLoading} from 'expo';
import { Asset } from 'expo-asset';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  state = {
    isReady: false,
  };

  async componentDidMount() {
   
  }

  cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }
  cacheFonts(fonts) {
    return Font.loadAsync(fonts);
  }

  async _loadAssetsAsync() {
    const imageAssets = this.cacheImages([
      require('./assets/airtel.jpg'),
      require('./assets/city.jpg'),
      require('./assets/mtn.png'),
      require('./assets/airtel.jpg'),
      require('./assets/vodafone.png'),
    ]);

    const fontAssets = this.cacheFonts({
      Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
    });

    await Promise.all([...imageAssets, ...fontAssets]);
  }
  render() {
    console.disableYellowBox = true;
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync()}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    } else {
      return (
        <Root>
          <Provider store={store}>
            <RootComponent />
          </Provider>
        </Root>
      );
    }
  }
}

export default App;
