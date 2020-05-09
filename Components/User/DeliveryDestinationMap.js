/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { getLatLonDiffInMeters } from "../../helpers";
import haversine from "haversine";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { connect } from "react-redux";
import {
  getCurrentLocation,
  getDestinationCoordinates,
} from "../../Actions/locationAction";
import axios from "axios";
import { getSelectedRider } from "../../Actions/SelectRiderAction";
import { isSignedIn } from "../../Actions/authAction";
import { BASE_URL, PV_API } from "../../constants";
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.015;
const LATITUDE = 0.009;
const LONGITUDE = 0.009;
import SuggestedRidersBottomSheet from "./Layouts/SuggestedRidersBottomSheet";
import BottomDrawer from "rn-bottom-drawer";
const { width, height } = Dimensions.get("window");
const TAB_BAR_HEIGHT = -6;
import { GOOGLE_MAPS_APIKEY } from "react-native-dotenv";
import { getRiders } from "../../Actions/getAllRidersAction";
import io from "socket.io-client";
import { StackActions } from "@react-navigation/native";
//addy.substr(0, addy.indexOf(','));
class DeliveryDestinationMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentloclat: props.origin.latitude,
      currentloclong: props.origin.longitude,
      Destlatitude: props.destination.latitude,
      Destlongitude: props.destination.longitude,
      distance: 0,
      duration: 0,
      price: 0,
      processing: false,
      buttonDisabled: true,
      loadingPrice: true,
      found: false,
      loadingLayout: false,
      requestAccepted: false,
      riderDetails: null,
      coordinateRiders: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }),
      originName: this.props.originName.substr(
        0,
        this.props.originName.indexOf(",")
      ),
      destinationName: this.props.destinationName.substr(
        0,
        this.props.destinationName.indexOf(",")
      ),
    };
    
    this.mapView = null;
    this.socket = io(PV_API, {
      secure: true,
      transports: ["websocket"],
    });
  }
  componentDidMount() {
    // this.RBSheet.open();

    console.log(this.props.authStatus);
  }
  requestRide = async () => {
    //fetch driver details

    const payload = {
      latitude: this.state.currentloclat,
      longitude: this.state.currentloclong,
      userEmail: "deedat5@gmail.com",
      destination: this.state.destinationName,
      pickup: this.state.originName,
      ...this.props.selected,
    };
    // console.log(payload)
    await this.socket.emit("hailride", payload);

    this.ListenForRiderDecision();
    // console.log('done');
  };
  trackMyRider = () => {
    //this should be called somehwere else
    this.socket.on(
      "myRiderLocation-" + this.props.selected.riderEmail,
      (det) => {
        console.log(det);
      }
    );
  };
  ListenForRiderDecision = () => {
    const userEmail = "deedat5@gmail.com";
    this.socket.on("riderChoice-" + userEmail, (det) => {
      //console.log(det);
      if (det.isAvailable) {
        this.setState({
          loadingLayout: false,
          requestAccepted: det.isAvailable,
          found: true,
          riderDetails: det,
        });
      } else {
        // this.props.navigation.dispatch(
        //   StackActions.replace('DeliveryDestinationMap'),
        // );
        alert("Rider declined your request");
      }
    });
  };

  DriverDetailsLayout = () => {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 15 }}>
          WE HAVE FOUND YOU A RIDER
        </Text>
        {/* <Text
          style={{
            fontWeight: 'bold',
            color: '#e7564c',
            fontSize: 14,
            marginTop: 10,
          }}>
          Rider will pickup your items in {'02:45'}
        </Text> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 20,
              backgroundColor: "#fafafa",
              borderRadius: 40,
              marginRight: 30,
            }}
          >
            <Icon name="phone" size={24} color="#000" style={{ margin: 2 }} />
          </View>

          <View style={{}}>
            <Image
              source={require("../../assets/deedat.jpg")}
              style={{ height: 100, width: 100, borderRadius: 100 }}
            />
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: "#fafafa",
              borderRadius: 40,
              marginLeft: 30,
            }}
          >
            <Icon name="phone" size={24} color="#000" style={{}} />
          </View>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
            fontSize: 16,
            marginTop: 10,
          }}
        >
          Deedat Billa
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            color: "#000",
            fontSize: 16,
            marginTop: 20,
          }}
        >
          {"GR-34-18"} - {"Honda"}
        </Text>
      </View>
    );
  };
  loadingLayout = () => {
    this.requestRide();
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/spinner.gif")}
          style={{ height: 100, width: 100 }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          WE ARE LOOKING FOR THE CLOSEST RIDER FOR YOU
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 14, marginTop: 20 }}>
          Your rider will be there soon
        </Text>
      </View>
    );
  };
  calcDistance = (riderlocation, userlocation) => {
    return haversine(riderlocation, userlocation) || 0;
  };
  renderContent = () => {
    if (this.props.riders) {
      var modifiedArr = [];
      var data = {};
      this.props.riders.forEach((element) => {
        let distance = this.calcDistance(
            { latitude: element.latitude, longitude: element.longitude },
            {
              latitude: this.state.currentloclat,
              longitude: this.state.currentloclong,
            }
          ),
          data = {
            latitude: element.latitude,
            longitude: element.longitude,
            riderEmail: element.riderEmail,
            distanceFromUser: distance,
            eta: distance / element.speed,
            id: element.id,
          };
        modifiedArr.push(data);
      });
      return (
        <SuggestedRidersBottomSheet
          price={this.state.price}
          loading={this.state.loadingPrice}
          riders={modifiedArr}
        />
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            There are no riders around you
          </Text>
        </View>
      );
    }
  };

  getCurrentRegion = () => ({
    latitude: this.state.currentloclat,
    longitude: this.state.currentloclong,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  getDestinationRegion = () => ({
    latitude: this.state.Destlatitude,
    longitude: this.state.Destlongitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  calculatePrice = async () => {
    try {
      const dist = {
        distance: this.state.distance,
      };
      //console.log(dist);
      const res = await axios.post(BASE_URL + "/pricing/", dist);
      if (this.props.riders) {
        this.setState({
          price: res.data.rounded_price,
          buttonDisabled: false,
          loadingPrice: false,
        });
      }
      // console.log(res.data);
    } catch (e) {
      // console.log(e.message);
      alert("please check your internet connection");
    }
  };

  topCard = () => {
    // console.log(this.state.originName);
    return (
      <View style={styles.top}>
        <View style={styles.topItems}>
          <Text style={{ marginRight: 8 }}>{this.state.originName}</Text>
          <Icon
            name="arrow-right"
            size={12}
            color="#000"
            style={{ margin: 2 }}
          />
          <Text style={{ marginLeft: 8 }}>{this.state.destinationName}</Text>
          <Text
            style={{
              position: "absolute",
              right: 0,
              margin: 10,
              fontWeight: "bold",
            }}
          >
            {this.state.distance}Km
          </Text>
        </View>
      </View>
    );
  };
  animateRiderMovement = () => {
    {
      this.state.riders.map((riders) =>
        coordinateRiders
          .timing({ latitude: riders.latitude, longitude: riders.longitude })
          .start()
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          translucent={true}
          backgroundColor={"transparent"}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          initialRegion={this.getCurrentRegion()}
          ref={(c) => (this.mapView = c)}
          style={{ ...StyleSheet.absoluteFillObject }}
        >
           {this.props.riders.map((riders) => (
                  <Marker.Animated
                    ref={(marker) => {
                      this.markerRider = marker;
                    }}
                    style={{
                      width: 40,
                      height: 40,
                      resizeMode: "contain",
                      transform: [{ rotate: `${riders.bearing}deg` }],
                      zIndex: 3,
                    }}
                    coordinate={{
                      latitude: riders.latitude,
                      longitude: riders.longitude,
                    }}
                  >
                    <Image
                      source={require("../../assets/motor.png")}
                      style={{ height: 40, width: 40 }}
                    />

                    <Marker
                      coordinate={{
                        latitude: riders.latitude,
                        longitude: riders.longitude,
                      }}
                    />
                  </Marker.Animated>
                ))}
          <MapView.Marker coordinate={this.getCurrentRegion()}>
            <Icon
              name="map-marker"
              size={24}
              color="#000"
              style={{ margin: 2 }}
            />
          </MapView.Marker>
          <MapView.Marker coordinate={this.getDestinationRegion()}>
            <Icon
              name="stop-circle"
              size={24}
              color="#000"
              style={{ margin: 2 }}
            />
          </MapView.Marker>
          {this.state.currentloclat && (
            <MapViewDirections
              origin={this.props.origin}
              destination={this.props.destination}
              strokeWidth={3}
              strokeColor="black"
              optimizeWaypoints={true}
              apikey={GOOGLE_MAPS_APIKEY}
              onStart={(params) => {
                // console.log(
                //   `Started routing between "${params.origin}" and "${
                //     params.destination
                //   }"`,
                // );
              }}
              onReady={async (result) => {
                await this.setState({
                  distance: result.distance,
                  duration: result.duration,
                });
                this.calculatePrice();
                // console.log(`Distance: ${result.distance} km`);
                // console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 50,
                    bottom: height / 50,
                    left: width / 50,
                    top: height / 50,
                  },
                });
              }}
              onError={(errorMessage) => {
                console.log("GOT AN ERROR");
              }}
            />
          )}
        </MapView>
        {/* <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={height/3}
          animationType={'slide'}
          duration={650}
         // minClosingHeight={height/3}
          closeOnPressMask={false}
          closeOnPressBack={false}
          customStyles={{
            container: {
              
            },
            wrapper: {
              backgroundColor: 'transparent',
              marginBottom: 70,
            },
          }}>
          {!this.state.loadingLayout && !this.state.found
            ? this.renderContent()
            : this.state.found
            ? this.DriverDetailsLayout()
            : this.loadingLayout()}
        </RBSheet> */}
        <BottomDrawer
          containerHeight={height / 3}
          offset={TAB_BAR_HEIGHT}
          startUp={true}
          onExpanded={(ex) => {}}
          shadow={true}
        >
          {!this.state.loadingLayout && !this.state.found
            ? this.renderContent()
            : this.state.found
            ? this.DriverDetailsLayout()
            : this.loadingLayout()}
        </BottomDrawer>
        {this.topCard()}
        <View style={styles.buttons}>
          <TouchableOpacity
            disabled={this.state.buttonDisabled}
            style={styles.bookButton}
            onPress={() =>
              this.setState(
                { loadingLayout: true },
                this.state.found
                  ? this.props.navigation.navigate("PaymentMethodsActivity", {
                      receipientPhone: this.props.route.params.receipientPhone,
                      price: this.state.price,
                      riderDetails: this.props.selected,
                    })
                  : null
              )
            }
          >
            {!this.state.loadingLayout && !this.state.found ? (
              <Text style={styles.bookButtonText}>SELECT RIDER</Text>
            ) : this.state.found ? (
              <Text style={styles.bookButtonText}>CONFRIM</Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  origin: state.locationData.OriginCoordinates,
  destination: state.locationData.DestinationCoordinates,
  destinationName: state.locationData.destinationName,
  originName: state.locationData.originName,
  riders: state.nearby_riders.nearby,
  selected: state.selected_rider.riderDetails,
  authStatus: state.auth.user,
  //error: state.locationData.error,
});

export default connect(
  mapStateToProps,
  {
    getCurrentLocation,
    getDestinationCoordinates,
    getRiders,
    getSelectedRider,
    isSignedIn,
  }
)(DeliveryDestinationMap);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    width: width,
    position: "absolute",
    backgroundColor: "#00000000",
    top: 0,
    marginTop: 30,
  },
  topItems: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "center",
    margin: 20,
    borderRadius: 8,
    elevation: 68,
  },
  buttons: {
    width: width,
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  bookButton: {
    backgroundColor: "#e7564c",
    paddingVertical: 15,
    borderRadius: 3,
    margin: 12,
  },
  bookButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
