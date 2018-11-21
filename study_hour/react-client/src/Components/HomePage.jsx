import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Paper} from '@material-ui/core'
import Map from './Map'
import { connect } from "react-redux";
import FileUpload from './FileUpload';
import BackgroundMusic from './Youtube';
import Typography from "@material-ui/core/Typography";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <Paper className='wallpaper'>
                    <NavBar/>
                <Map width='800' height='800' />
                </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(HomePage);
