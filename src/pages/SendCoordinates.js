import React, {Component} from 'react';
import {View, Text, TextInput, ToastAndroid} from 'react-native';
import {CardSection, Card, Button} from "../common";
import firebase from "firebase";

import {ImagePicker} from 'expo';


class GeoLoc extends Component{
    state = {msg:'', image: null,};
    constructor(props){
        super(props);

        this.state={
            latitude: null,
            longitude: null,
            error: null,
        };
    }

    onButtonPress = async () => {

        let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [4, 3],
              base64:true
          });

        if (!result.cancelled) {
              this.setState({image: result.base64});
              console.log(result.base64);
              ToastAndroid.show('Before', ToastAndroid.SHORT);
              // firebase.database().ref().child('Image')
              //     .push(result.base64)
              //     .then()
              //     .catch(()=>{
              //        ToastAndroid.show('Failed!', ToastAndroid.SHORT);
              //     });
              //
              // ToastAndroid.show('Successful!', ToastAndroid.SHORT);
          }

        const {msg, latitude, longitude, image} = this.state;
        const {currentUser} = firebase.auth();
        firebase.database().ref(`${currentUser.uid}`)
            .push({msg, latitude, longitude, image});

        ToastAndroid.show('Successful!', ToastAndroid.SHORT);
    };

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            (position)=>{
                this.setState({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    error: null
                });
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout:20000, maximumAge:1000},
        );
    }

    // _takePhoto = async () => {
    //       let result = await ImagePicker.launchCameraAsync({
    //           allowsEditing: true,
    //           aspect: [4, 3],
    //           base64:true
    //       });
    //
    //
    //       if (!result.cancelled) {
    //           this.setState({image: result.uri});
    //           console.log(result.base64);
    //           ToastAndroid.show('Before', ToastAndroid.SHORT);
    //           firebase.database().ref().child('Image')
    //               .push(result.base64)
    //               .then()
    //               .catch(()=>{
    //                  ToastAndroid.show('Failed!', ToastAndroid.SHORT);
    //               });
    //
    //           ToastAndroid.show('Successful!', ToastAndroid.SHORT);
    //       }
    // };

    render(){
        let { image } = this.state;
        return(
            <Card>

                <CardSection>
                    <View style={{flexGrow:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:18, color:'#000'}}>Latitude : {this.state.latitude}</Text>
                        <Text style={{fontSize:18, color:'#000'}}>Longitude : {this.state.longitude}</Text>
                        {this.state.error ? <Text>Error: {this.state.error}</Text>:null}
                    </View>
                </CardSection>

                <CardSection>
                    <TextInput style={{color: '#000', flex:1, flexDirection:'row', fontSize: 18}}
                               placeholder="Enter Details"
                               autoGrow
                               multiline
                               value={this.state.msg}
                               onChangeText={msg => this.setState({msg})}
                    >

                    </TextInput>
                </CardSection>

                <CardSection>
                    <Button
                        title="Upload Image"
                        // onPress={this._takePhoto}
                    />

                    <Button onPress={this.onButtonPress.bind(this)}>
                        Send data
                    </Button>
                </CardSection>

            </Card>
        );
    }

}

export default GeoLoc;