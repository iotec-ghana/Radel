import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import UserDeliveryLocationHistoryList from './Layouts/UserDeliveryLocationHistoryList';
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = 0.3;
import axios from 'axios';
import {BASE_URL, StatusBarColor} from '../../constants';
import {AsyncStorage} from 'react-native';
export default class CompletedRidesFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      history: [],
    };
  }
  loadinglayout = () => {
    return <ActivityIndicator size="large" color="#e7564c" />;
  };
  empty() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:18,fontWeight:"bold"}}>You have no completed rides</Text>
      </View>
    );
  }
  componentDidMount = async () => {
    try {
      this.setState({loading: true});
      const user = await AsyncStorage.getItem('authdata');
      const token = JSON.parse(user);

      const config = {
        headers: {Authorization: `Bearer ${token.user.token}`},
      };
      const response = await axios.get(`${BASE_URL}/deliveryHistory/`, config);
      response.data.deliveries.forEach(element => {
        if (element.deliverystatus == 'completed') {
          this.setState({
            history: this.state.history.concat(element),
            loading: false,
          });
        }
      });
      this.setState({loading: false});
      // console.log(this.state.history);
    } catch (error) {
      console.log(error.message);
      this.setState({loading: false});
    }
  };
  history() {
    //console.log(this.state.history)
    return (
      // <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        <FlatList
          data={this.state.history}
          renderItem={({item}) => (
            <View>
              <UserDeliveryLocationHistoryList data={item} />
            </View>
          )}
          keyExtractor={item => item.deliveryid}
        />
      </ScrollView>
      // </SafeAreaView>
    );
  }
  render() {
    const {loading, history} = this.state;
    if (loading) {
      return this.loadinglayout();
    } else if (history.length > 0) {
      return this.history();
    } else {
      return this.empty();
    }
    
  }
}
