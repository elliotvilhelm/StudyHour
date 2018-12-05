import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css';
import NavBar from './HeaderComponent/NavBar';
import {Paper} from '@material-ui/core';
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import SearchBar from './SearchBar';
import Footer from './FooterComponent/Footer';


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
                <div style={{margin: '3%'}}>
                <Typography variant="headline" style={{fontSize: 72, fontWeight: 500}}>Study Hour</Typography>
                <Typography variant="display2" style={{fontSize: 30, fontWeight: 200}}>Find your next Study Location</Typography>
                </div>
                <div className='div-home'>
                        <SearchBar/>
                </div>
            <Footer/>
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
