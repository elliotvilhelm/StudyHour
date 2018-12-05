import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import axios from "axios";
import NavBar from './../HeaderComponent/NavBar';
import {Link} from 'react-router-dom';
import Button from "@material-ui/core/Button/Button";
import * as addlocation_action from "../../actions/addlocation_action";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import LocationAvgRating from "./LocationAvgRating";

function location_card(location) {
    const location_img = <img src={location.image_url} style={{borderRadius: '2%'}} width='500' height='350'/>;
    const no_img = <Typography variant='headline' color='error'>No Image Found</Typography>;
    return (
    <div  className="location-card" style={{marginTop: '2%', backgroundColor: 'rgba(0,0,0,0.7)', width: '100%', borderRadius: 10}} >
        <Link to={'/Location/' + location.id}>
            <div className="locationImage-card">
                {location.image_id !== -1 ? location_img : no_img}
            </div>
        </Link>
        <div className="locationInfo-card">
            <Link to={'/Location/' + location.id}>
                <div className="location-name">
                    <Typography variant="headline"
                                style={{
                                    fontSize: 50,
                                    fontWeight: 500
                                }}>{location.name}</Typography>
                    <Typography variant="display4"
                                style={{fontSize: 30}}>{location.address}</Typography>
                </div>
            </Link>
            <div className="location-rate">
                <LocationAvgRating location_id={location.id}/>
            </div>
        </div>
    </div>
    );
}

class LocationTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            table: [],
            favorite: false,
        };
        this.handleAddLocation = this.handleAddLocation.bind(this);
    }

    componentDidMount (){
        this.createTable();
    }

    createTable() {
        this.setState({locations: this.props.location.state.list});
        this.setState({favorite: this.props.location.state.favorite});
        this.setState({updated_locations: []});
        this.setState({updated_final_locations: []});

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
                                location_card(location)
                            ])
                        });
                    });
                } else {
                    this.setState({
                        table: this.state.table.concat([
                            location_card(location)
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
        console.log('state', this.state);
        let locationTable;
        const add_button = (
                    <div className="addLocation-button">
                            <Button onClick={this.handleAddLocation} variant="contained" color="white">
                                Add Location
                            </Button>
                    </div>
                    );

        locationTable = (
                <Paper className='wallpaper'>
                    <NavBar />
                    <Paper style={{padding: "2%", width:"80%", margin:"auto", marginTop: "3%", backgroundColor: 'rgba(66, 66, 66, .5)'}}>
                    {!this.state.favorite ? add_button : ""}
                    <div className='div-card-hold'>
                       {this.state.table}
                    </div>
                    </Paper>
                </Paper>
            );
        
        
         
        return locationTable;
    }
}

export default LocationTable;
