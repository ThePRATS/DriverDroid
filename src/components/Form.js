import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';

        const Form = ({ value, placeholder, keyboardType, secureTextEntry, onChangeText }) => {
          const { container, inputBox } = styles;
        return (
            <View style={container}>
                <TextInput
                           style={inputBox}
                           underlineColorAndroid='rgba(0,0,0,0)'
                           placeholder={placeholder}
                           onChangeText={onChangeText}
                           placeholderTextColor="#ffffff"
                           selectionColor="#fff"
                           value={value}
                           keyboardType={keyboardType}
                           secureTextEntry={secureTextEntry}

                />

            </View>
        );
};

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },

    inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
    },


});
export default Form;
