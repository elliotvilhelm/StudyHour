import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../history";
import * as auth_actions from "../actions/auth";
import LocationThumbnail from './LocationThumbnail'
import NavBar from './HeaderComponent/NavBar';
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";

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
            <Paper className='wallpaper-books'>
                <NavBar />
                <Paper style={{paddingTop: '30px', paddingBottom: '100px', width: '70%', background: 'rgba(0,0,0,0.5)', margin: 'auto'}}>
                    <table>
                        <tr className="location-header-tr">
                            <Typography variant='display1'>Locations</Typography>
                        </tr>
                        {this.state.table}
                    </table>
                </Paper>
            </Paper>
        )
    }
}
export default LocationTable;
