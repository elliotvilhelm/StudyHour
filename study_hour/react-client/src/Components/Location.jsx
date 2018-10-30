import React, { Component } from "react";
import {
  AppBar,
  Paper,
  Grid,
  Card,
  CardContent,
  Checkbox,
  Typography,
} from "@material-ui/core";

import MiniComment from './MiniComment'
import uno from "../images/postgres.png";


const content = {
  comments: [{ name: "Ana", rating: 2, text: "Noisy place" }, { name: "Bob", rating: 3, text: "It's ok" }]
}

let location = {
  name: "Giesel",
  address: "123 Xiaofan Road",
  outlet: true,
  wifi: true,
  quitness: 3,
  //level: 1-4
  openHour: {
  }
}
export default class Location extends Component {

  render() {

    return (

      <Paper style={{ width: parseInt(this.props.width), padding: 5, backgroundColor: "#EFEFEF", paddingRight:0, paddingLeft: 0, paddingTop:0 }}>
      <AppBar style={{ width: "inherit", padding: 2, marginBottom: 5, float: "none", position:"static", borderRadius: 2}} >
        <Typography variant="display2" color="inherit">{location.name}</Typography>
        <Typography variant="overline" color="inherit">{location.address}</Typography>
      </AppBar>
        <Grid container>
          <Grid item sm style={{ marginRight: 50 }}>
            <Card>
              <img
                style={{ width: "auto", height: 200 }}
                title="Uno"
                src={uno}
                alt="Icon"
              />
            </Card>
          </Grid>
          <Grid item sm style={{ textAlign: "left" }}>
            <Typography style={{ color: "grey" }}>
              Outlet
              <Checkbox
                value="checkedG"
                disabled
                checked={location.outlet ? true : false}
                style={{ color: location.outlet? "green" : "grey" }}
              />
            </Typography>
            <Typography  style={{ color: "grey" }}>
              Wifi
              <Checkbox
                value="checkedG"
                disabled
                checked={location.wifi ? true : false}
                style={{ color: location.wifi? "green" : "grey" }}
              />
            </Typography>


            <Typography  style={{ verticalAlign: "baseline", color: "grey" }}>
                  Quitness
                  <input
                    style={{ position: "relative", top: 7, marginLeft: 10, width: 70, display: "inline" }}
                    type="range"
                    step="1"
                    min="1"
                    max="4"
                    value={location.quitness}
                  />
                </Typography>

          </Grid>
        </Grid>

        <Grid container>
          <CardContent>
            <Typography variant="title" style={{ color: "grey" }}>
              Open Hours:
            </Typography>
            <ul style={{ margin: "none", textAlign: "left", listStyleType: "none" }}>
              <li>Mon:</li>
              <li>Tue:</li>
              <li>Wed:</li>
              <li>Thu:</li>
              <li>Fri:</li>
            </ul>
          </CardContent>
        </Grid>
        <MiniComment {...content} />
      </Paper>
    );
  }
}
