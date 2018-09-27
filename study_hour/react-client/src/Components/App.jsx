import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import HomePage from './HomePage';
import About from './About';
import '../styles/style.css'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import history from '../history'

class App extends Component {
    render() {
        return (

            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                <BrowserRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/Home" component={HomePage} />
                        <Route path="/About" component={About}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }

}
export default App;