import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../history";
import * as auth_actions from "../actions/auth";
import LocationThumbnail from './LocationThumbnail'
import NavBar from './HeaderComponent/NavBar';

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


               console.log("response", response.data.dbresponse);
             this.setState({locations: response.data.dbresponse});

            let table = []
            table = this.state.locations.map(location =>
                <tr>
                    <LocationThumbnail name={location.name} address={location.address}/>
                </tr>
            )
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    render() {
        return (
            <div className="locations-table-div wallpaper-locationTable">
                <NavBar />
                <div className="container">
                    <table>
                        <tr className="location-header-tr">
                            <h1 className="center blue-text">Locations</h1>
                        </tr>
                        {this.state.table}
                    </table>
                </div>
            </div>
        )
    }
}
export default LocationTable