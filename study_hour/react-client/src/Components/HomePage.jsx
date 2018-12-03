import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Paper} from '@material-ui/core'
import Map from './Map'
import { connect } from "react-redux";
import BackgroundMusic from './Youtube';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ImageLoader from 'react-image-file';
import TextField from "@material-ui/core/TextField";
import SearchBar from './SearchBar';
import Card from "@material-ui/core/Card/Card";


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ""}
    }
    componentDidMount (){
        var self = this;
        axios({
            method: 'get',
            url: `/api/images`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            self.setState({url: response.data.url})

        }).catch(function (response) {
            console.log("Error",response);
        });
    }

    render() {
        if (this.state.url !== "") {
            // var imgl = <img src={this.state.url} />;
            var imgl = <div></div>;
        }
        else
            var imgl = <div></div>;
        return (
            <Paper className='wallpaper'>
                <NavBar/>
                <Typography variant="headline" style={{fontSize: 72, fontWeight: 500}}>Study Hour</Typography>
                <Typography variant="display2" style={{fontSize: 30}}>Find your next Study Location</Typography>
                <div className='div-home'>
                    <div className='div-search'>
                        <SearchBar/>
                    </div>
                    <div className="div-map">
                        <Map width='500' height='500' />
                    </div>
                </div>
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
