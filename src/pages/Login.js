import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import * as firebase from 'firebase';
import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';


export default class Login extends React.Component {

    state = {
            email: '',
            password: '',
        };

    render() {
        return(
            <View style={styles.container}>
                <Logo/>
                <Form
                    placeholder="Email Address"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    keyboardType="email-address"
                    secureTextEntry={false}

                />
                <Form
                    placeholder="Password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    keyboardType="default"
                    secureTextEntry

                />
                <TouchableOpacity style={styles.button} onPress={this.LoginUser.bind(this)} >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>New User?</Text>
                    <TouchableOpacity onPress={this.signup}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
                </View>
            </View>
        )
    }



        LoginUser(){

            try {
                firebase.auth().signInWithEmailAndPassword(this.state.email.trim(), this.state.password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))

            }
            catch(error){
                console.log(error.toString())
            }

        }

        onLoginSuccess(){
            this.setState({
               email: '',
               password: ''
            });
            ToastAndroid.show('Login Successful!', ToastAndroid.SHORT);
            Actions.main();
        }

        onLoginFail(){
            this.setState({
               email: '',
               password: ''
            });
            ToastAndroid.show('Login Failed!', ToastAndroid.SHORT);
        }

        signup() {
            Actions.signup()
        }

}
const styles = StyleSheet.create({
    container : {
        backgroundColor:'#455a64',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
    },
    signupTextCont : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },

    button: {
        width:300,
        backgroundColor:'#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },

    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
});
