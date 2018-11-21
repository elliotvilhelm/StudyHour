import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import Login from './Login';
import Signup from './Signup';
import '../styles/style.css'

import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import history from '../history';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';
import LocationTable from './LocationTable';
import Review from './Review';

import Location from './Location';

import book from '../images/book.svg'
import ResetPassword from "./ResetPassword";
import ProfilePage from "./ProfilePage";
const dark_theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#273258',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
          },
        type: 'dark',
    },
  });

class App extends Component {
    constructor(props) {
        super(props);
    }
    componenetDidMount() {
    }
    render() {
        return (
            <MuiThemeProvider theme={dark_theme}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <link rel="icon" href={book} type="image/svg" sizes="16x16" />
                <Router history={history}>
                    <Switch>
                        <Route exact path="/" component={NoAuth(Login)}/>
                        <Route exact path="/Home" component={RequireAuth(HomePage)} />
                        <Route exact path="/Home/ResetPassword" component={RequireAuth(ResetPassword)} />
                        <Route exact path="/Home/ProfilePage" component={RequireAuth(ProfilePage)} />
                        <Route path="/About" component={RequireAuth(About)}/>
                        <Route path="/Login" component={NoAuth(Login)}/>
                        <Route path="/Review" component={Review}/>
                        {/*<Route path="/Location" component={Review}/>*/}
                        <Route path="/Locations" component={LocationTable}/>
                        <Route path="/Signup" component={NoAuth(Signup)}/>
                        <Route path="/Location/:id" component={Location}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }

}
export default App;
