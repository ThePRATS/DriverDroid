import React from 'react';
import {View} from 'react-native';

//Functional component
//Passing one component to another shows as props.children
const Card = (props) => {
    return (
        <View style = {styles.containerStyle}>
            {props.children}
        </View>
    );
};

//standard method of styling
const  styles = {
    containerStyle: {
        borderWidth : 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
};

export { Card };