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
import SimpleSlider from "./Slider";



export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {location: {}, location_liked: false, images: []};
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    componentDidMount() {
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
            });
            axios({
                method: 'post',
                url: `/api/location_liked`,
                data: {location_id: self.state.location.id, user_id: localStorage.getItem('user_id')},
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => {
                response = response.data.dbresponse[0];
                console.log("is it favorited?",response);
                console.log(self.state.location.id ,localStorage.getItem('user_id'));
                if(response.count!=0) {
                    console.log("not zero!!")
                    self.setState({location_liked: true});
                }
            })
                .catch(function (response) {
                    console.log("Error",response);
                });

            axios({
                method: 'post',
                url: '/api/images/location',
                data: {location_id: self.state.location.id},
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => {
                let s3_codes = response.data.dbresponse;
                let images = [];
                Promise.all(
                    s3_codes.map(code => {
                        axios({
                            method: 'post',
                            url: '/api/images',
                            data: {code: code.s3code},
                            config: {headers: {'Content-Type': 'multipart/form-data'}}
                        }).then(response => {
                            images.push(<img className="img-big" src={response.data.url}/>);
                            self.setState({images: images})
                        });
                    })
                ).then(response => {
                    console.log("all promise done");
                })

            }).catch(function (response) {
                console.log("Error",response);
            });
        })
            .catch(function (response) {
                console.log("Error",response);
            });




    }
    favoriteOnClick(){
        if(!this.state.location_liked) {
            axios({
                method: 'post',
                url: '/api/addFavorite',
                data: {location_id: this.state.location.id, user_id: localStorage.getItem('user_id')},
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            }).then(response => {
                console.log('success add favorites');
                this.setState({location_liked: !this.state.location_liked});
            })
                .catch(function (response) {
                    console.log("Error", response);
                });
        }
        else{
            axios({
                method: 'post',
                url: '/api/deleteFavorite',
                data: {location_id: this.state.location.id, user_id: localStorage.getItem('user_id')},
                config: {headers: {'Content-Type': 'multipart/form-data'}}
            }).then(response => {
                console.log('success deleted favorites');
                this.setState({location_liked: !this.state.location_liked});
            })
                .catch(function (response) {
                    console.log("Error", response);
                });
        }

    }
    handleSubmit(event){
        this.favoriteOnClick();
    }

    render() {

        // return( <h1>{this.props.match.params.id}</h1>)
        return (
            <Paper className='wallpaper-books'>
                <NavBar/>
                <Paper style={{paddingTop: '30px', paddingBottom: '100px', width: '70%', background: 'rgba(0,0,0,0.5)', margin: 'auto'}}>
                    <div className="location-div">
                        <Grid
                            container
                            spacing={24}
                            direction="row"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid container
                                  spacing={24}
                                  direction="column"
                                  alignItems="center"
                                  justify="center"

                            >
                                <Typography variant="display4" style={{fontWeight: 500}}>{this.state.location.name}</Typography>
                                <Grid item sm>
                                    <SimpleSlider images={this.state.images}/>
                                    <br/>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={this.props.button}
                                            onClick={this.handleSubmit}>
                                        {this.state.location_liked ? '❤️ Like ❤️️' : '🖤 Like 🖤'}
                                    </Button>
                                </Grid>
                            </Grid>
                            <Paper style={{width: '50%', padding: '20px'}}>
                                <Grid item sm style={{float: 'left'}}>
                                    <Typography style={{ color: "white" }}>
                                        Outlet
                                        <Checkbox
                                            value="checkedG"
                                            disabled
                                            checked={!!this.state.location.outlet}
                                            style={{ color: this.state.location.outlet? "#00BFFF" : "white" }}
                                        />
                                    </Typography>
                                    <Typography  style={{ color: "white" }}>
                                        Wifi
                                        <Checkbox
                                            value="checkedG"
                                            disabled
                                            checked={this.state.location.wifi}
                                            style={{ color: location.wifi? "#00BFFF" : "white" }}
                                        />
                                    </Typography>


                                    <Typography  style={{ verticalAlign: "baseline", color: "white" }}>
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
                                    <CardContent style={{padding: '10px'}}>
                                        <table className="table-open">
                                            <th>
                                                <Typography variant="title" style={{ color: "white" }}>
                                                    Open Hours:
                                                </Typography>
                                            </th>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Monday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Tuesday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Thursday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Friday: 8:00 am - 5:30 pm</Typography></tr>
                                        </table>
                                    </CardContent>
                                </Grid>
                            </Paper>
                            <Grid container
                                  spacing={24}
                                  direction="column"
                                  alignItems="center"
                                  justify="center"
                            >
                                <CommentTable location_id={this.props.match.params.id}/>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
            </Paper>
        );
    }
}
