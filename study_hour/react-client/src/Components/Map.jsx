import React, { Component, Fragment } from "react";
import axios from "axios/index";

let currentMap = null;
let markConfig;

let mockSearched = [
  {
    address: "San diego",
    close_time: null,
    id: 5,
    internet: true,
    lat: 32.8712,
    lng: -117.217,
    name: "Geisel",
    noise_level: 4,
    open_time: null,
    outlet: false
  }
]
class Map extends Component {

  constructor(props) {
    super(props);
    this.state = { locations: props.locations, locationsMark: {}, searchedLocations: props.searchedLocations, searchedMarks: {} };
    

    this.retriveNearby = this.retriveNearby.bind(this);
    this.retriveSearch = this.retriveSearch.bind(this);
    this.markByLocations = this.markByLocations.bind(this);
    this.renderLocationsContent = this.renderLocationsContent.bind(this);
    this.drawLegend = this.drawLegend.bind(this);
    this.state.searchedLocations = mockSearched;
  }

  renderLocationsContent(locations, locationsMark) {
    let contentTemplate = (name, address, open_time, close_time, outlet, internet, quiteness, id) =>
      `
        <div class="map-content">
        <h1>${name}</h1>
        <p>address: 
        ${address}
        </p>
        <br>
        <p style="color: green">open: ${open_time}</p>
        <p style="color: red">closed: ${close_time}</p>
        <hr>
        <p>outlet: ${outlet}</p>
        <p>wifi: ${internet}</p>
        <p>noise level: ${quiteness}</p>
        <button style="background-color: white; margin: 5px; padding: 5px; border-radius: 2px;" ><a href="./location/${id}">Take a Look</a></button>
        </div>
      `
    let locationInfos = locations.map((loc) => {
      let infoWindow = new google.maps.InfoWindow({
        content: contentTemplate(loc.name, loc.address, loc.open_time, loc.close_time, 
          loc.outlet, loc.internet, loc.noise_level, loc.id)
        
      });
      return infoWindow;
    });

    for(let idxAndMark of locationsMark.entries()) {
      idxAndMark[1].addListener('click', function(){
        locationInfos[idxAndMark[0]].open(currentMap, idxAndMark[1]);
      })
    }
    
  }
  markByLocations(locations, fillColor='#f20') {
    let locationsMark = locations.map((loc) => {
      return new google.maps.Marker({ ...markConfig, position: { 
        lat: loc.lat, lng: loc.lng }, 
        icon: {
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                fillColor: fillColor,
                fillOpacity: 1,
                strokeColor: '#bcd',
                strokeOpacity: 0.5,
                strokeWeight: 3,
                scale: 5
      },
        label: loc.name
     });
    });
    
    this.renderLocationsContent(locations, locationsMark);
    return locationsMark;
  }
  
  retriveNearby(currentLoc) {
    let targetURL = `/api/locate/${currentLoc.lat}/${currentLoc.lng}`;
    
    axios({
      method: 'get',
      url: targetURL,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    }).then(response => {
      response = response.data;
      let locations = response;
      console.log(response);
      
      let locationsMark = this.markByLocations(locations);
      this.setState({ ...this.state, locations: locations, locationsMark: locationsMark});
    })
      .catch(function (err) {
        console.log("Error", err);
      });

  }

  drawLegend() {
    var legend = document.getElementById('legend');
    var div = document.createElement('div');
    div.innerHTML = `
      <p><span style="color:#f20">Red Down Arrow:</span></p>
      <p>Nearby Study Location</p>
      <p><span style="color:#09a">Blue Dot:</span></p>
      <p>Current Location</p>
    `;
    
    legend.appendChild(div);
    currentMap.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
  }

  retriveSearch() {
    let searchedLocations = this.state.searchedLocations;
    if(currentMap && searchedLocations) {
      let searchedMarks = this.markByLocations(searchedLocations, '#ff0');
      
      let newCenter = {lat: searchedLocations[0].lat, lng: searchedLocations[0].lng};
      console.log(newCenter);
      this.setState({...this.state, searchedMarks: searchedMarks});
      console.log(searchedMarks);
      setTimeout(function() {
        currentMap.panTo(newCenter);
      }, 5000);

    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.searchedLocations !== this.props.searchedLocations) {
      this.setState({...this.state, searchedLocations: this.props.searchedLocations})
    }
  }
  componentDidMount() {
    let currentPos;
    currentMap = new window.google.maps.Map(document.getElementById("map"), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 1
    });
    this.drawLegend();
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
      const retriveSearch = this.retriveSearch;
      navigator.geolocation.getCurrentPosition(function (position) {
        currentPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        retriveNearby(currentPos);
        retriveSearch();
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
        <div 
          id="legend"
          class="map-content"
          style={{
            padding: 5,
            margin: 2,
            fontSize: 12,
            borderRadius: 5,
            backgroundColor: '#e9ffff',
            border: '1px dash black'

          }}
          ></div>
      </div>
    );
    
    return map;
  }

}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
export default Map;
