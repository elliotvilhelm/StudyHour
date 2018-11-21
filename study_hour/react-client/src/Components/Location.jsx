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
import geisel from '../images/geisel.jpg';
import axios from "axios/index";
import CommentTable from "./CommentTable";
import NavBar from './HeaderComponent/NavBar';
import AddCommentModal from "./AddCommentModal";
import Button from "@material-ui/core/Button/Button";


const content = {
    comments: [{ name: "Ana", rating: 2, text: "Noisy place" }, { name: "Bob", rating: 3, text: "It's ok" }]
};

let location = {
    name: "Giesel",
    address: "123 Xiaofan Road",
    outlet: true,
    wifi: true,
    quitness: 3,
    //level: 1-4
    openHour: {
    }
};

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {location: {}}
    }
    componentDidMount() {
        console.log("going in")
        let id = this.props.match.params.id;
        let self = this;
        axios({
            method: 'get',
            url: `/api/Location/${id}`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            console.log("response location/n", response.data.dbresponse);
            response = response.data.dbresponse[0];
            self.setState({location:
                    {
                        address: response.address,
                        internet: response.internet,
                        name: response.name,
                        outlet: response.outlet,
                        close_time: response.close_time,
                        open_time: response.open_time,
                        noise_level: response.noise_level,
                        id: response.id
                    }
            })

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }


    render() {

        // return( <h1>{this.props.match.params.id}</h1>)
        console.log("state:", this.state);
        return (
            <Paper className='wallpaper'>
                <NavBar/>
                <div className="location-div">
                    <Grid
                        container
                        spacing={24}
                        direction="row"
                        alignItems="center"
                        justify="center"
                    >
                        <Paper style={{left: 50, width: '50%', padding: 5, backgroundColor: "#EFEFEF"}}>
                            <Typography variant="display4" style={{color: "black"}}>{this.state.location.name}</Typography>
                            <Grid item sm>
                                <Card>
                                    <img
                                        style={{width: "auto", height: 300 }}
                                        title="geisel"
                                        src={geisel}
                                        alt="Icon"
                                    />
                                    <br/>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={this.props.button}
                                            onClick={this.handleSubmit}>
                                        ♡ Like ♡
                                    </Button>
                                </Card>
                            </Grid>
                            <Grid item sm style={{float: 'left'}}>
                                <Typography style={{ color: "grey" }}>
                                    Outlet
                                    <Checkbox
                                        value="checkedG"
                                        disabled
                                        checked={!!this.state.location.outlet}
                                        style={{ color: this.state.location.outlet? "green" : "grey" }}
                                    />
                                </Typography>
                                <Typography  style={{ color: "grey" }}>
                                    Wifi
                                    <Checkbox
                                        value="checkedG"
                                        disabled
                                        checked={this.state.location.wifi}
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
                                        value={this.state.location.quitness}
                                    />
                                </Typography>
                            </Grid>
                            <Grid item sm>
                                <CardContent>
                                    <Typography variant="title" style={{ color: "grey" }}>
                                        Open Hours:
                                    </Typography>
                                    <ul style={{ margin: "none", listStyleType: "none" }}>
                                        <li>Monday: 8:00 am - 5:30 pm</li>
                                        <li>Tuesday: 8:00 am - 5:30 pm</li>
                                        <li>Wednesday: 8:00 am - 5:30 pm</li>
                                        <li>Thursday: 8:00 am - 5:30 pm</li>
                                        <li>Friday: 8:00 am - 5:30 pm</li>
                                    </ul>
                                </CardContent>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
                <div className="comments-modal">
                    <AddCommentModal/>
                </div>
                <div className="comments-table-div">
                    <CommentTable location_id={this.props.match.params.id}/>
                </div>
            </Paper>
        );
    }
}
