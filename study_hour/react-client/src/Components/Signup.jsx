import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "./HeaderComponent/NavBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Typography, Grid} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import axios from "axios/index";
import * as signup_actions from "../actions/signup_action";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';
import history from '../history';
import { bindActionCreators } from 'redux'


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


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            fullname:'',
            username:'',
            password:'',
            confirm: true,
            city:'',
            question:'',
            answer:'', bio:'',
        };
        this.handleChangeFullname = this.handleChangeFullname.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFullname(event) {
        this.setState({fullname: event.target.value});
    };
    handleChangeUserName(event) {
        this.setState({username: event.target.value});
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
    handleChangeQuestion(event) {
        this.setState({question: event.target.value});
    };
    handleChangeAnswer(event) {
        this.setState({answer: event.target.value});
    };
    handleChangeBio(event) {
        this.setState({bio: event.target.value});
    };
    handleSubmit() {
        if (this.state.confirm === true) {
            this.props.dispatch(signup_actions.signup(this.state.fullname,
                this.state.username,
                this.state.password,
                this.state.city,
                this.state.question,
                this.state.answer,
                this.state.bio));
        }
    }

    render () {
        const { classes } = this.props;
        return (
            <div>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Sign Up To StudyHour</Typography>

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
                                        id="standard-username-input"
                                        label="Username"
                                        type="test"
                                        className={classes.textField}
                                        placeholder="User Name"
                                        onChange={this.handleChangeUserName}
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
                                        id="standard-question-input"
                                        label="Create your security question"
                                        className={classes.textField}
                                        type="test"
                                        placeholder="Security Question"
                                        onChange={this.handleChangeQuestion}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-answer-input"
                                        label="Answer to your security question"
                                        className={classes.textField}
                                        type="test"
                                        placeholder="Security Answer"
                                        onChange={this.handleChangeAnswer}
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Signup)));