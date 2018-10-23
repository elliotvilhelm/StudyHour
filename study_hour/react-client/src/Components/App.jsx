import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Login from './Login';
import '../styles/style.css'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import history from '../history';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';

class App extends Component {
    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/Home" component={RequireAuth(HomePage)} />
                        <Route path="/About" component={About}/>
                        <Route path="/Login" component={NoAuth(Login)}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }

}
export default App;
