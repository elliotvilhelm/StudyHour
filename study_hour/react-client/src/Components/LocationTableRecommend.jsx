import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../history";
import * as auth_actions from "../actions/auth";
import LocationThumbnail from './LocationThumbnail'


class LocationTableRec extends Component {
    constructor(props) {
        super(props);
        this.state = {locations: [], table: []}

    }
    componentDidMount (){
        this.createTable();
    }

    retriveNearby(currentLoc) {
      let targetURL = `/api/locate/${currentLoc.lat}/${currentLoc.lng}`;
      console.log(targetURL);
      axios({
        method: 'get',
        url: targetURL,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then(response => {
        response = response.data;
        console.log(response);
        this.setState({ ...this.state, locations: response});
      })
        .catch(function (err) {
          console.log("Error", err);
        });
  
    }

    createTable() {
      let options = {
        enableHighAccuracy: true,
        timeout: 1000000,
        maximumAge: 0
      };

      if (navigator.geolocation) {
        const retriveNearby = this.retriveNearby;
  
        navigator.geolocation.getCurrentPosition(function (position) {
          currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
  
          retriveNearby(currentPos);
  
        }, error, options);
       
      
        let table = []
        table = this.state.locations.map(location =>
            <tr>
                <LocationThumbnail name={location.name} address={location.address}/>
            </tr>
        )
        this.setState({table: table});
      } else {
        alert("Your browser can not retrieve your location.")
      }
    }

    render() {
        return (
            <div className="locations-table-div">
                <table>
                    <tr className="location-header-tr">
                        Locations
                    </tr>
                    {this.state.table}
                </table>
            </div>
        )
    }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
export default LocationTableRec;
