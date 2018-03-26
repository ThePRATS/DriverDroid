import  React from 'react';
import {View, Text, ToastAndroid, StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';
import {Button} from "../common";

export default class Main extends React.Component{

    render(){
        return(
            <View style={styles.container}>

                <Button onPress={()=>this.enable}>
                    Enable Button
                </Button>

                <Button>
                    Activity1
                </Button>

                <Button>
                    Activity2
                </Button>

                <Button onPress={this.map}>
                    Map
                </Button>

            </View>
        )

    }

    enable(){
        ToastAndroid.show('U clicked', ToastAndroid.SHORT);
    }

    map(){
        Actions.map();
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});