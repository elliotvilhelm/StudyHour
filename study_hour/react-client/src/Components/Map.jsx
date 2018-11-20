import React, { Component, Fragment } from "react";
import axios from "axios/index";
import * as auth_actions from "../actions/auth";

let currentMap;
let markConfig;

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = { locations: props.locations, locationsMark: {}};
    this.retriveNearby = this.retriveNearby.bind(this);
    this.markNearbyLocations = this.markNearbyLocations.bind(this);
  }

  markNearbyLocations() {
    let locations = this.state.locations;
    let locationsMark = locations.map((loc) => {
      return new google.maps.Marker({ ...markConfig, position: { lat: loc.lat, lng: loc.lng } });
    });
    this.setState({...this.state, locationsMark: locationsMark});
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
      this.markNearbyLocations();
    })
      .catch(function (err) {
        console.log("Error", err);
      });

  }

  componentDidMount() {
    let currentPos;
    currentMap = new window.google.maps.Map(document.getElementById("map"), {
       center: {lat: -34.397, lng: 150.644},
      zoom: 1
    });

    markConfig = {
      map: currentMap,
      animation: google.maps.Animation.DROP
    };


    let options = {
      enableHighAccuracy: true,
      timeout: 1000000,
      maximumAge: 0
    };

    // Get current Location
    if (navigator.geolocation) {
      const retriveNearby = this.retriveNearby;

      navigator.geolocation.getCurrentPosition(function (position) {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        retriveNearby(currentPos);
        let Marker = new google.maps.Marker({
          ...markConfig,
          position: currentPos,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#09a',
            fillOpacity: 1,
            strokeColor: '#bbb',
            strokeOpacity: 0.5,
            strokeWeight: 3,
            scale: 8
          }
        });

        currentMap.setCenter(currentPos);
        currentMap.setZoom(18);

      }, error, options);
    } else {
      alert("Your browser can not retrieve your location.")
    }

  }
  render() {

    const map = (
      <div>
        <div
          id="map"
          style={{
            width: parseInt(this.props.width),
            height: parseInt(this.props.height),
            margin: 'auto',
            marginTop: '1%',
            marginBottom: '1%',
            borderRadius: 5,
            backgroundColor: 'black'
          }}
        />
      </div>
    );

    return map;
  }

}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function mapStateToProps(state) {
  return {
      location: state
  }
}
export default Map;
