import React, { Component } from "react";


let loaded = false;

const myKey = "AIzaSyCJ-N7LHuHd3A2EX8hi7l3rpoM-sqWg0uo";
const script = document.createElement("script");
document.head.appendChild(script);

class Map extends Component {
    
  componentDidMount() {
    window.initMap = this.initMap();
    loadMap(myKey);
  }

  initMap() {
    return () => {
      let pos = { lat: -34.397, lng: 150.644 };
      // Construct map object and render to the given element
      const currentMap = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 1
      });

      // const infoWindow = new google.maps.InfoWindow();
      var Marker;
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          Marker = new google.maps.Marker({
            map: currentMap,
            animation: google.maps.Animation.DROP,
            position: pos,
            icon:  {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#00F',
                fillOpacity: 0.6,
                strokeColor: '#00A',
                strokeOpacity: 0.9,
                strokeWeight: 1,
                scale: 7
            }
          });
          // infoWindow.setPosition(pos);
          // infoWindow.open(currentMap);
          currentMap.setCenter(pos);
          currentMap.setZoom(18);
        });
      }
    };
  }

  render() {
    console.log(this.props);
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
            borderRadius: 5
          }}
        />
      </div>
    );

    if (!loaded) {
      return map;
    }
    return;
  }
}

function loadMap(key) {
  if (!loaded) {
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
  }
}

export default Map;
