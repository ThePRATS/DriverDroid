import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/main';
import mapViewScreen from './pages/Maps';
import Complaint from './pages/Complaint';


export default class Routes extends React.Component {
    render() {
        return(
            <Router>
                <Stack>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" initial={true}/>
                    <Scene key="signup" component={Signup} title="Register"/>
                    <Scene key="main" component={Main} title="Main" />
                    <Scene key="map" component={mapViewScreen} title="Map"/>
                    <Scene key="complaint" component={Complaint} title="Complaint"/>
                </Stack>
                </Stack>
            </Router>
        )
    }
}