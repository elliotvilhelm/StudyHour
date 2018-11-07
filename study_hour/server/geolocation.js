const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const app = express();

var geoFindMe = () => {
  var errorMsg;


  if (!navigator.geolocation){
    errorMsg = "Geolocation is not supported by your browser";
    return;
  }

  var success = (position) => {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

  }

  var error = () => {
    errorLocation = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

