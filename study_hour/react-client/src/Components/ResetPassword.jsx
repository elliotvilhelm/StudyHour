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
        marginLeft: '40%',
        // marginRight: theme.spacing.unit,
        width: 200,
        background: 'blue'
    },
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

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            oldpassword:'',
            newpassword:'',
            confirmpassword:''
        };
        this.handleChangeOldPassword = this.handleChangeOldPassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeOldPassword(event) {
        this.setState({oldpassword: event.target.value});
    };
    handleChangeNewPassword(event) {
        this.setState({newpassword: event.target.value});
    };
    handleChangeConfirmPassword(event) {
        this.setState({confirmpassword: event.target.value});
    };
    handleChangeAnswer(event) {
        this.setState({answer: event.target.value});
    };
    handleSubmit(event) {
        this.props.dispatch(signup_actions.signup(this.state.username, this.state.password));
    }

    render () {
        const { classes } = this.props;
        return (
            <div>

                <NavBar/>
                <Paper className='wallpaper'>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Reset Password</Typography>

                        <form  autoComplete="off">
                            <Grid container>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-username-input"

                                        label="CurrentPassword"
                                        type="password"
                                        className={classes.textField}
                                        placeholder="CurrentPassword"
                                        onChange={this.handleChangeOldPassword}

                                        required
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-password-input"
                                        label="NewPassword"

                                        className={classes.textField}
                                        type="password"
                                        placeholder="NewPassword"
                                        onChange={this.handleChangeNewPassword}
                                        autocomplete='off'
                                        required
                                    />
                                </Grid>
                                 <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-password-input"
                                        label="ConfirmPassword"

                                        className={classes.textField}
                                        type="password"
                                        placeholder="ConfirmPassword"
                                        onChange={this.handleChangeConfirmPassword}
                                        autocomplete='off'
                                        required
                                    />
                                </Grid>

                                <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.handleSubmit}>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(ResetPassword)));