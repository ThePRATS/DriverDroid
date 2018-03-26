import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
import Logo from '../components/Logo';
import Form from '../components/Form';

import {Actions} from 'react-native-router-flux';


export default class Signup extends React.Component {


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
                <TouchableOpacity style={styles.button} onPress={this.signUpUser.bind(this)} >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this.goBack}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
                </View>
            </View>
        )
    }

            a() {
              console.log("success");
            }
            b(){
              console.log("no");
            }
        signUpUser() {

            try {

                if (this.state.password.length<6){
                    alert("Please enter atleast 6 characters")
                    return;
                }

                firebase.auth().createUserWithEmailAndPassword(this.state.email.trim(), this.state.password)
                .then(this.a.bind(this))
                .catch(this.b.bind(this));
                //     .then(() => {
                //         ToastAndroid.show("signup done ...",ToastAndroid.SHORT);
                //     })
                // ;

            }
            catch(error){
                console.log(error.toString());
            }
        };

        goBack() {
            Actions.pop();
        };




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
