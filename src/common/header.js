//Import Library
import React from 'react';
import { Text, View } from 'react-native';

//Make Component
//prop used for parent child communication
const Header = ( props ) => {

    const { textStyle, viewStyle } = styles;
    return (
        <View style = { viewStyle }>
            <Text style = { textStyle }>{ props.headerText }</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#e7e5ed',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 60,
        paddingTop: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 15},
        shadowOpacity: 0.2,
        elevation: 3,
        position: 'relative'

    },
    textStyle: {
        fontSize: 30,
        textAlign: 'center'
    }
};

export { Header };

