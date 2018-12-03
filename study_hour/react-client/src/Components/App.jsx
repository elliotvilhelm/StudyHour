import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import Login from './User/Login';
import Signup from './User/Signup';
import AddLocation from './Location/AddLocation';
import LocationTable from './Location/LocationTable';
import Location from './Location/Location';
import ValidateUser from './User/ValidateUser';
import SecurityCheck from './User/SecurityCheck';
import ResetPassword from "./User/ResetPassword";
import '../styles/style.css'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import history from '../history';
import RequireAuth from './RequireAuth';
import NoAuth from './NoAuth';
import book from '../images/book.svg'
import ProfilePage from "./User/ProfilePage";
import EditProfilePage from "./User/EditProfilePage";


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
                        <Route path="/Home/ProfilePage/:id" component={RequireAuth(ProfilePage)} />
                        <Route path="/EditProfile" component={RequireAuth(EditProfilePage)} />
                        <Route path="/Login" component={NoAuth(Login)}/>
                        <Route path="/Locations" component={RequireAuth(LocationTable)}/>
                        <Route path="/Signup" component={NoAuth(Signup)}/>
                        <Route path="/Location/:id" component={RequireAuth(Location)}/>
                        <Route path="/AddLocation" component={RequireAuth(AddLocation)}/>
                        <Route path="/ValidateUser" component={NoAuth(ValidateUser)}/>
                        <Route path="/SecurityCheck" component={NoAuth(SecurityCheck)}/>
                        <Route path="/ResetPassword" component={NoAuth(ResetPassword)} />
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }

}
export default App;
