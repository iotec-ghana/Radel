import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView, FlatList} from 'react-native';
import UserDeliveryLocationHistoryList from './Layouts/UserDeliveryLocationHistoryList';
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = 0.3;
export default class UpcomingFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
        history: [
            {
              id: 1,
              origin: {
                latitude: 5.6523483,
                longitude: -0.2135845,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              destination: {latitude: 5.534415500000001, longitude: -0.4252737},
            },
            {
              id: 2,
              origin: {
                latitude: 5.6523483,
                longitude: -0.2135845,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              },
              destination: {latitude: 5.534415500000001, longitude: -0.4252737},
            },
            {
                id: 2,
                origin: {
                  latitude: 5.6523483,
                  longitude: -0.2135845,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
                destination: {latitude: 5.534415500000001, longitude: -0.4252737},
              },
              {
                id: 2,
                origin: {
                  latitude: 5.6523483,
                  longitude: -0.2135845,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                },
                destination: {latitude: 5.534415500000001, longitude: -0.4252737},
              },
          ],
    };
  }

  render() {
    return (
        <SafeAreaView  style={{flex:1}}>
        <ScrollView>
          <FlatList
            data={this.state.history}
            renderItem={({item}) => (
              <View>
                <UserDeliveryLocationHistoryList
                  origin={item.origin}
                  destination={item.destination}
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}
