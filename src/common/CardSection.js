import React from 'react';
import { View } from 'react-native';

//Functional component
//Passing one component to another shows as props.children
// Square brackets to override style passed from calling page seperate it by ',' props.styles
const CardSection = (props) => {
    return (
        <View style = {[styles.containerStyle]}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
};

export { CardSection };