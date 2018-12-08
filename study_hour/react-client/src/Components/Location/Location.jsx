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
import geisel from '../../images/geisel.jpg';
import axios from "axios/index";
import CommentTable from "./../Comments/CommentTable";
import NavBar from './../HeaderComponent/NavBar';
import AddCommentModal from '../Comments/AddCommentModal';
import Button from "@material-ui/core/Button/Button";
import SimpleSlider from "./../Slider";
import FileUpload from "./../FileUpload";
import Footer from "../FooterComponent/Footer";



export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {location: {}, location_liked: false, images: [], file_loaded: false};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.imageUpload = this.imageUpload.bind(this);
        this.fileLoaded = this.fileLoaded.bind(this);
        this.upload_ref = React.createRef();
        this.fetchImages = this.fetchImages.bind(this);
    }
    componentDidMount() {
        let id = this.props.match.params.id;
        let self = this;
        axios({
            method: 'get',
            url: `/api/Location/${id}`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
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
                if(response.data.dbresponse[0].count !== "0") {
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
                            this.setState({
                                images: this.state.images.concat([<img className="img-big" src={response.data.url}/>])
                            });
                        });
                    }))

            }).catch(function (response) {
                console.log("Error",response);
            });
        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    fetchImages() {
        this.setState({images: []});
        axios({
            method: 'post',
            url: '/api/images/location',
            data: {location_id: this.state.location.id},
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
                        this.setState({
                            images: this.state.images.concat([<img className="img-big" src={response.data.url}/>])
                        });
                    });
                }))

        }).catch(function (response) {
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

    imageUpload() {
        this.upload_ref.current.fileUpload(this.props.match.params.id);
        this.fetchImages();
    }

    fileLoaded(file_loaded) {
        this.setState({file_loaded: file_loaded})
    }


    render() {
        // console.log(this.state.file_loaded);
        // let upload;
        // if (this.state.file_loaded) {
        let upload = (<Paper style={{width: '40%', display: 'inline-block'}}>
        <Button id="submit-button"
                onClick={this.imageUpload}>
            Upload Location Image
        </Button>
    </Paper>);
        // }
        //
        // else {
        //     upload = <div></div>;
        // }

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
                                    <div className="div-slider">
                                        <SimpleSlider images={this.state.images}/>
                                    </div>
                                    <div style={{height: '8px'}}></div>
                                    <Button
                                        className={this.props.button}
                                        onClick={this.handleSubmit}>
                                        {this.state.location_liked ? '❤️ Like ❤️️' : '🖤 Like 🖤'}
                                    </Button>
                                    <div style={{height: '8px'}}></div>
                                    <FileUpload multi={true} fileLoaded={this.fileLoaded} ref={this.upload_ref}/>
                                    <div style={{height: '8px'}}></div>
                                    {upload}
                                    <div style={{height: '8px'}}></div>
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
                                        Internet
                                        <Checkbox
                                            value="checkedG"
                                            disabled
                                            checked={!!this.state.location.internet}
                                            style={{ color: this.state.location.internet? "#00BFFF" : "white" }}
                                        />
                                    </Typography>


                                    <Typography  style={{ color: "white" }}>
                                        Noise Level
                                        <input
                                            style={{ position: "relative", top: 7, marginLeft: 10, width: 70, display: "inline" }}
                                            type="range"
                                            step="1"
                                            min="1"
                                            max="5"
                                            contentEditable={false}
                                            value={this.state.location.noise_level}
                                        />
                                    </Typography>
                                    <br/>
                                    <Typography  style={{ color: "white" }}>
                                        Address: {this.state.location.address}
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
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Monday:    8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Tuesday:   8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Wednesday: 8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Thursday:  8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Friday:    8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Saturday:  8:00 am - 5:30 pm</Typography></tr>
                                            <tr><Typography variant="caption" style={{ color: "white" }}>Sunday:    8:00 am - 5:30 pm</Typography></tr>
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
                                <div style={{height: '8px'}}></div>
                                <div style={{height: '8px'}}></div>
                                <CommentTable location_id={this.props.match.params.id}/>
                            </Grid>
                        </Grid>
                    </div>
                </Paper>
                <Footer/>
            </Paper>
        );
    }
}
