import React from 'react';
import {} from 'react-native';
import firebase from 'firebase';
import {Location} from "expo";
import GeoLoc from "./SendCoordinates";


class Complaint extends React.Component{

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

    render(){
        return(
            <GeoLoc/>
        )
    }

}

export default Complaint;
