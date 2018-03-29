import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import * as firebase from 'firebase';
import Routes from './src/Routes';
import {Actions} from 'react-native-router-flux';
import {Spinner} from "./src/common";
import Main from "./src/pages/main";

const config = {
    apiKey: "AIzaSyBdzRPM76JAq74d2pgSIAN_bM7dHNLZo94",
    authDomain: "driver-droid.firebaseapp.com",
    databaseURL: "https://driver-droid.firebaseio.com",
    projectId: "driver-droid",
    storageBucket: "driver-droid.appspot.com",
    messagingSenderId: "1015875175143"
};


firebase.initializeApp(config);
export default class App extends React.Component {

    state = {loggedIn: null};

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({loggedIn:true});
                Actions.main();
            }
            else{
                this.setState({loggedIn:false});
            }
        });
    }


    render() {
        if(this.state.loggedIn === null){
            return <Spinner size = "large"/>
        }
        // if (this.state.loggedIn){
        //
        // }
        return (
            <View style={styles.container}>
                <Routes />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
