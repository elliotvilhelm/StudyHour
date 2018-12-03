import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import axios from "axios";
import NavBar from './HeaderComponent/NavBar';
import giesel from '../images/geisel.jpg';
import {Link} from 'react-router-dom';

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
            this.setState({locations: this.props.location.state.list});
            let table = [];
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
            );
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    render() {
        return (
            <div className="wallpaper-locationTable">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css "/>
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