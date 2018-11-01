import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import '../styles/style.css'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import history from '../history';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';
import Location from './Location';


class App extends Component {
    render() {
        console.log("USER: ", localStorage.getItem('user'));
        return (

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={NoAuth(Login)}/>
                        <Route exact path="/Home" component={RequireAuth(HomePage)} />
                        <Route path="/About" component={RequireAuth(About)}/>
                        <Route path="/Login" component={NoAuth(Login)}/>
                        <Route path="/Signup" component={NoAuth(Signup)}/>
                        <Route path="/Location" component={Location}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }

}
export default App;
