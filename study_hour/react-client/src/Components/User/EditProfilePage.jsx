import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "../HeaderComponent/NavBar";
import '../../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Typography, Grid} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';
import axios from "axios";
import * as profilePage_actions from "../../actions/profilePage_action";


const styles = theme => ({
    textField: {
        width: "100%",
        margin: 'auto',
        textAlign: 'center'
    },
    button: {
        width: 200,
    },
    item: {
        paddingLeft: '25%',
        paddingRight: '25%'
    }
});

class EditProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullname:'',
            password:'',
            confirm: true,
            city:'',
            bio:''
        };
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        axios({
            method: 'post',
            url: `/api/Profile`,
            data: {id: localStorage.getItem('user_id')},
            config: {headers: {'Content-Type': 'application/json'}}
        }).then(response => {
            this.setState({
                fullname: response.data.dbresponse[0].fullname,
                password: response.data.dbresponse[0].password,
                city: response.data.dbresponse[0].city,
                bio: response.data.dbresponse[0].bio
            });
        }).catch(function (response) {
            console.log("Error", response);
        });
    }

    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    };
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    };
    handleConfirmPassword(event) {
        const password = this.state.password;
        const confirm = event.target.value;
        if (password !== confirm && password !== '' && confirm !== '') {
            this.setState({confirm: false});
        }
        else {
            this.setState({confirm: true});
        }
    };
    handleChangeCity(event) {
        this.setState({city: event.target.value});
    };
    handleChangeBio(event) {
        this.setState({bio: event.target.value});
    };
    handleSubmit() {
            this.props.dispatch(profilePage_actions.submitProfile(
                localStorage.getItem('user_id'),
                this.state.fullname,
                this.state.password,
                this.state.city,
                this.state.bio));
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Edit Profile Page</Typography>
                        <form  autoComplete="off">
                            <Grid container>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-name-input"
                                        label="First and Last name"
                                        type="test"
                                        className={classes.textField}
                                        placeholder="Full Name"
                                        onChange={this.handleChangeFullname}
                                        required
                                        style={{padding: "10px"}}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-password-input"
                                        label="Password"
                                        className={classes.textField}
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.handleChangePassword}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-passwordConfirm-input"
                                        label="Confirm password"
                                        className={classes.textField}
                                        type="password"
                                        placeholder="Password"
                                        onChange={this.handleConfirmPassword}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                        error={!this.state.confirm}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-city-input"
                                        label="What city are you from?"
                                        className={classes.textField}
                                        type="test"
                                        placeholder="City"
                                        onChange={this.handleChangeCity}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-bio-input"
                                        label="Describe yourself"
                                        className={classes.textField}
                                        type="test"
                                        placeholder="Enter bio"
                                        onChange={this.handleChangeCity}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                        maxLength="30"
                                    />
                                </Grid>
                                <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.handleSubmit}
                                            color="primary">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Paper>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(EditProfilePage)));
