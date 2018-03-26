import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import * as firebase from 'firebase';
import Routes from './src/Routes';

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

    componentWillMount() {

    }

    render() {
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
