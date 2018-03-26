import React from "react";
import { View, Text, ToastAndroid, Button, Dimensions } from "react-native";
import firebase from 'firebase';
import { MapView, Location } from 'expo';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {Actions} from 'react-native-router-flux';

import GeoLoc from './SendCoordinates';


const {width,height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, distanceInterval : 15 };
const GOOGLE_API_KEY = 'AIzaSyB13MpI1LMJD38RjFfdkoOyI25Rr2OyNV0';

// const firebaseConfig = {
//     apiKey: "AIzaSyA_bBHAD4cSHBZJtdcI87pl8KFhipcsq9Y",
//     authDomain: "geolocate-1515760482364.firebaseapp.com",
//     databaseURL: "https://geolocate-1515760482364.firebaseio.com",
//     projectId: "geolocate-1515760482364",
//     storageBucket: "geolocate-1515760482364.appspot.com",
//     messagingSenderId: "120744641497"
// };



class mapViewScreen extends React.Component{


    state = {
        initialPosition : {
            latitude : 37,
            longitude: -122,
            latitudeDelta : LATITUDE_DELTA ,
            longitudeDelta: LONGITUDE_DELTA ,
        },
        trackMarkerPosition :{
            latitude : 37,
            longitude : -122,
        },
        longPressMarkerCoordinates :{
            latitude: 0,
            longitude: 0,
        },
        dangerMarkerCoords : [{

            latitude : 0,
            longitude : 0,
            name : 'initial',

        }],
        speed : 0,
        updateDangerBool : false,


    };



    async getLoc(){

        const location = await Location.getCurrentPositionAsync({});
        console.log(location);

        const  initialPosition = {

            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,

        };

        const trackMarkerPosition = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };

        this.setState({initialPosition, trackMarkerPosition });

    };

    locationChanged = (location) => {
        const region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        };

        const trackMarkerPosition = {

            latitude: location.coords.latitude,
            longitude: location.coords.longitude,

        };

        console.log(location);
        // this.setState({location});
        console.log(" watch "+region.latitude+" "+region.longitude+"  "+location.coords.speed);
        this.setState({initialPosition : region, speed: location.coords.speed, trackMarkerPosition});

        ToastAndroid.show(" watch "+region.latitude+" "+region.longitude+"  "+location.coords.speed,ToastAndroid.SHORT);


    };

    async watchPos(){

        Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
    };


    onMapLongPress(e){

        const longPress = {

            latitude : e.nativeEvent.coordinate.latitude,
            longitude : e.nativeEvent.coordinate.longitude,
        };

        this.setState({longPressMarkerCoordinates : longPress });
    }


    async fillMarkerArray(data){

        const dangerMarkers = [];
        await data.on('value',(snapshot) => {
            snapshot.forEach((child) =>{
                // console.log(child.val().name);
                // console.log(child.val().latitude);
                // console.log(child.val().longitude);
                dangerMarkers.push({name : child.val().name,
                    latitude : child.val().latitude,
                    longitude : child.val().longitude,
                });

                this.setState({dangerMarkerCoords : dangerMarkers});
            });
        });

    };

    updateDangerCoords(){

      console.log("Button Pressed");
      const data = firebase.database().ref("/danger-coords");
            this.fillMarkerArray(data);
            console.log(this.state.dangerMarkerCoords);
            this.setState({updateDangerBool : true});
          // if(this.state.dangerMarkerCoords[0] != null) {
          //     console.log("not null");
          //     console.log(this.state.dangerMarkerCoords);
          //     this.setState({updateDangerBool: true});
          // }

    };


    updateDangerCheck(){

        if(this.state.updateDangerBool){

            return(
                this.state.dangerMarkerCoords.map(marker => (
                    <MapView.Marker
                        coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                        title={marker.name}
                    >
                        <View  style = {styles.dangerMarkerStyles} />
                    </MapView.Marker>
                ))
        );
    }}

    componentWillMount(){

        console.disableYellowBox = true;
        //firebase.initializeApp(firebaseConfig);
        Location.setApiKey(GOOGLE_API_KEY);
        this.getLoc();
        this.watchPos();

    }

    componentWillUnmount(){
        // this.watchId.remove();
    };

    complaint(){
        Actions.complaint();
    }


    render(){

        return(
            <View style={{flex:1}}>
                <GooglePlacesAutocomplete
                    placeholder='Enter Location'
                    minLength={2}
                    autoFocus={true}
                    returnKeyType={'default'}
                    fetchDetails={true}

                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                        console.log(details);
                        alert("Latitude :"+details.geometry.location.lat+"\nLongitude : "+details.geometry.location.lng);

                    }}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: GOOGLE_API_KEY,
                        language: 'en', // language of the results
                        // types: '(cities)' // default: 'geocode'
                    }}

                    styles={{
                        textInputContainer: {
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderTopWidth: 0,
                            borderBottomWidth:0,
                            marginTop: 45,
                        },
                        textInput: {
                            marginLeft: 0,
                            marginRight: 0,
                            height: 38,
                            color: '#5d5d5d',
                            fontSize: 16
                        },
                        predefinedPlacesDescription: {
                            color: '#1faadb'
                        },
                    }}
                    currentLocation={false}
                />


                <MapView

                    style={{ flex: 1 }}
                    //showsUserLocation
                    zoomEnabled
                    region={this.state.initialPosition}

                    onLongPress={this.onMapLongPress.bind(this)}

                >

                    <MapView.Marker
                        coordinate={this.state.trackMarkerPosition}
                        title={"Abhishek"}
                        description={"You can't escape from me HaHaHa.... I am a tracker "}
                    >

                        <View style={styles.markerStyles}/>


                    </MapView.Marker>


                    <MapView.Marker
                        coordinate={this.state.longPressMarkerCoordinates}
                        title={"destination"}
                        description={"reach me if you can ... "}
                        pinColor = {"darkgreen"}
                    />

                    {this.updateDangerCheck()}


                    <MapViewDirections
                        origin={this.state.trackMarkerPosition}
                        destination={this.state.longPressMarkerCoordinates}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="hotpink"
                        // language
                        //alternatives = {true}
                    />

                </MapView>


                <Text>--------------------------</Text>
                <Text>Map Speed</Text>
                <Text>{this.state.speed * 3.6} km/hr</Text>
                <Text>---------------------------</Text>

                <Button
                    title = "get Danger Update"
                    onPress = {() => this.updateDangerCoords()}
                />


                <Text>-----------------------------</Text>

                <Button onPress={this.complaint}>
                    Make Complaint
                </Button>

            </View>
        );

    };

}

const styles ={
    radius:{
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: "hidden",
        backgroundColor: "rgba(0,122,255,0.1)",
        borderWidth: 1,
        borderColor: "rgba(0,122,255,0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    markerStyles:{

        height: 12,
        width:12,
        borderWidth: 0,
        borderColor: "white",
        borderRadius: 9,
        overflow: "hidden",
        backgroundColor: "#007AFF"
    },

    dangerMarkerStyles:{

        height: 10,
        width:10,
        borderWidth: 0,
        borderColor: "white",
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#FF0000"
    }



};


export default mapViewScreen;