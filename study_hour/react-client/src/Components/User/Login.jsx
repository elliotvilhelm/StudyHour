import React, {Component, Fragment} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "../HeaderComponent/NavBar";
import '../../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Typography} from '@material-ui/core';
import {Button} from "@material-ui/core";
import * as auth_actions from "../../actions/auth";
import * as resetPassword_actions from "../../actions/resetPassword_action";
import { connect } from  "react-redux";
import { withRouter } from 'react-router-dom';
import Footer from "../FooterComponent/Footer";

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

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
        };
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({username: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleForgotPassword() {
        this.props.dispatch(resetPassword_actions.resetPassword());
    }

    handleSubmit() {
        this.props.dispatch(auth_actions.authenticate(this.state.username, this.state.password));
    }

    render () {
        const { classes } = this.props;
        return (

            <Fragment>
                <Paper className='wallpaper-books-2'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Login To StudyHour</Typography>
                        <Grid container>
                            <Grid item xs="12" className={classes.item}>
                                <TextField
                                    id="standard-email"
                                    label="User Name"
                                    placeholder="User Name"
                                    onChange={this.handleChangeUserName}
                                    autoComplete='off'
                                    type="test"
                                    className={classes.textField}
                                    value={this.state.username}
                                    required
                                    style={{paddingBottom: "10px"}}
                                />
                            </Grid>
                            <Grid item xs="12" className={classes.item}>
                                <TextField
                                    id="standard-password-input"
                                    label="Password"
                                    placeholder="Password"
                                    autoComplete='off'
                                    type="password"
                                    onChange={this.handleChangePassword}
                                    className={classes.textField}
                                    value={this.state.password}
                                    required
                                    style={{paddingBottom: "10px"}}
                                />
                            </Grid>
                            <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                <Button className={classes.button}
                                        onClick={this.handleForgotPassword}
                                        color="white"
                                >
                                    Forgot password?
                                </Button>
                            </Grid>
                            <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                <Button variant="contained"
                                        className={classes.button}
                                        onClick={this.handleSubmit}
                                        color="primary"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                    <div style={{height: '300px'}}/>
                    <Footer/>
                </Paper>
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Login)));
