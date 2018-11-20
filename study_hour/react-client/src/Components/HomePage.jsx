import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Paper} from '@material-ui/core'
import Map from './Map'
import { connect } from "react-redux";
import FileUpload from './FileUpload';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Paper className='wallpaper'>
                <Map width='500' height='500' />
                </Paper>
                <FileUpload/>
            </div>
        )
    }
}

// export default HomePage;
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(HomePage);
