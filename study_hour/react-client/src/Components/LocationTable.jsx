import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../history";
import * as auth_actions from "../actions/auth";
import LocationThumbnail from './LocationThumbnail'
import NavBar from './HeaderComponent/NavBar';
<<<<<<< HEAD
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
=======
import {ButtonBase, Typography} from '@material-ui/core';
import giesel from '../images/geisel.jpg';
import {Link} from 'react-router-dom';
>>>>>>> f33cf509a1e8bc737b2b72e9b0fa83770d4637fa

class LocationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {locations: [], table: []}
    }
    componentDidMount (){
        this.createTable();
    }
    createTable() {
        axios({
            method: 'post',
            url: '/api/Locations',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            this.setState({locations: response.data.dbresponse});

            let table = []
            table = this.state.locations.map(location =>
                <div className="card">
                    <Link to={'/Location/'+location.id}>
                        <div className="card-image">
                            <img src={giesel}/>
                        </div>
                        <span className="card-title">{location.name}</span>
                        <div className="card-content">
                            {location.address}
                        </div>
                    </Link>
                </div>
            )
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    render() {
        return (
            <div className="wallpaper-locationTable">
                <NavBar />
                <div className="container">
                    <div className="cards">
                        <div className="row">
                            <div className="col s12 m12">
                                {this.state.table}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LocationTable;