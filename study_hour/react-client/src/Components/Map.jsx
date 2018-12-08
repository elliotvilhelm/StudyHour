import React, { Component, Fragment } from "react";
import axios from "axios/index";

let currentMap = null;
let markConfig;

let mapStyles = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#523735"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#c9b2a6"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#dcd2be"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ae9e90"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#93817c"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a5b076"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#447530"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f5f1e6"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fdfcf8"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f8c967"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#e9bc62"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e98d58"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#db8555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#806b63"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8f7d77"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ebe3cd"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dfd2ae"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b9d3c2"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#92998d"
            }
        ]
    }
];

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = { locations: props.locations, locationsMark: {}, searchedLocations: props.searchedLocations, searchedMarks: {}, centerLocation: props.centerLocation };


        this.retriveNearby = this.retriveNearby.bind(this);
        this.retriveSearch = this.retriveSearch.bind(this);
        this.markByLocations = this.markByLocations.bind(this);
        this.renderLocationsContent = this.renderLocationsContent.bind(this);
        this.drawLegend = this.drawLegend.bind(this);
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
                label: {
                    text: loc.name,
                    fontFamily: 'Roboto',
                    color: "#523735",
                    fontSize: "12px",
                }
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
        //currentMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);
    }

    clearMarks() {
        for (let mark in this.state.searchedMarks){
            mark.setMap(null);
            console.log('cleeear');
        }
    }

    renderMarks() {
        for (let mark in this.state.searchedMarks){
            mark.setMap(currentMap);
            console.log('seeet');
        }
    }
    retriveSearch() {
        let searchedLocations = this.state.searchedLocations;

        if(currentMap && searchedLocations) {
            this.clearMarks();
            let searchedMarks = this.markByLocations(searchedLocations, '#ff0');
            this.setState({...this.state, searchedMarks: searchedMarks});
            this.renderMarks();
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.searchedLocations !== this.props.searchedLocations) {
            this.setState({...this.state, searchedLocations: this.props.searchedLocations})
            this.retriveSearch();
        }

        if(prevProps.centerLocation !== this.props.centerLocation) {
            if (this.props.centerLocation) {
                let centerLocation = this.props.centerLocation;
                let newCenter = {lat: centerLocation.lat, lng: centerLocation.lng};
                this.setState({...this.state, centerLocation: centerLocation});
                setTimeout(function() {
                    currentMap.panTo(newCenter);
                }, 500);
            }
        }

    }
    componentDidMount() {
        let currentPos;
        currentMap = new window.google.maps.Map(document.getElementById("map"), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 12,
            styles: mapStyles
        });
        //this.drawLegend();
        markConfig = {
            map: currentMap,
            animation: google.maps.Animation.DROP
        };


        let options = {
            enableHighAccuracy: true,
            timeout: 1000000,
            maximumAge: 0
        };

        this.retriveSearch();
        // Get current Location
        if (navigator.geolocation) {
            //const retriveNearby = this.retriveNearby;
            navigator.geolocation.getCurrentPosition(function (position) {
                currentPos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                //retriveNearby(currentPos);

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
            <div >
                <div
                    id="map"
                    style={{
                        position: 'fixed',
                        width: this.props.width,
                        height: '70vh',
                        margin: 'auto',
                        marginTop: '1%',
                        marginBottom: '1%',
                        borderRadius: 5,
                        backgroundColor: 'black'
                    }}
                />
                {/*
        <div
          id="legend"
          class="map-content"
          style={{
            fontSize: 10,
            borderRadius: 5,
            backgroundColor: '#e9ffff',
            border: '1px dash black'

          }}
          ></div> */}
            </div>
        );

        return map;
    }

}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}
export default Map;
