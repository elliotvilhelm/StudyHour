import React, {Component} from 'react';
import LocationCard from './LocationCard';
import '../../styles/style.css'
import axios from "axios";
import NavBar from './../HeaderComponent/NavBar';

import Button from "@material-ui/core/Button/Button";
import * as addlocation_action from "../../actions/addlocation_action";

import {Paper, Grid} from "@material-ui/core";

import Map from '../Map'


class LocationTable extends Component {
    constructor(props) {
        super(props);
        if(this.props.location.state) {
            this.state = {
                locations: this.props.location.state.list,
                table: [],
                favorite: this.props.location.state.favorite,
                centerLocation: null
            };
        }
        this.handleAddLocation = this.handleAddLocation.bind(this);
        this.highLight = this.highLight.bind(this);
    }

    highLight(location) {
        return (target) => {
            this.setState({centerLocation: location});
        }
    }
    componentDidMount (){
        
        this.createTable();
        
    }

    createTable() {
        let locations = this.props.location.state.list;
        Promise.all(locations.map(location => {
            axios({
                method: 'post',
                url: '/api/images/location',
                config: {headers: {'Content-Type': 'application/json'}},
                data: {location_id: location.id}
            }).then(response => {
                if (response.data.dbresponse)
                    location.image_id = response.data.dbresponse[0].s3code;
                else
                    location.image_id = -1;
                return location;
            }).then((location) => {
                if (location.image_id !== -1) {
                    axios({
                        method: 'post',
                        url: '/api/images',
                        data: {code: location.image_id},
                        config: {headers: {'Content-Type': 'application/json'}}
                    }).then(response => {
                        location.image_url = response.data.url;
                        this.setState({
                            table: this.state.table.concat([
                                <LocationCard location={location} onMouseOver={this.highLight}/>
                            ])
                        });
                    });
                } else {
                    this.setState({
                        table: this.state.table.concat([
                            <LocationCard location={location} onMouseOver={this.highLight}/>
                        ])
                    });
                }
            });
        }));
    }

    handleAddLocation() {
        this.props.dispatch(addlocation_action.linkButton());
    }

    render() {
        let locationTable;
        const add_button = (
                    
                            <Button  style={{float: 'left'}} onClick={this.handleAddLocation} variant="contained" color="white">
                                Add Location
                            </Button>
                    
                    );

        locationTable = (
                <Paper className='wallpaper'>
                    <NavBar />
                    <Paper style={{padding: "1%", width:"90%", margin:"auto", marginTop: "3%"}}>
                    {!this.state.favorite ? add_button : ""}
                    <Grid container spacing={20}>
                    <Grid item md={7}>
                    
                    
                       {this.state.table}
                    
                    </Grid>
                    <Grid item md={5}>

                    <div style={{position: 'sticky', top: '5vh', marginTop: '3%'}} >
                        <Map width="85%" searchedLocations={this.state.locations} centerLocation={this.state.centerLocation}/>
                    </div>
                    </Grid>
                    </Grid>
                    </Paper>                    
                </Paper>
            );
        
        
         
        return locationTable;
    }
}

export default LocationTable;
