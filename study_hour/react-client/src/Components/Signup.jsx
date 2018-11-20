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
        width: "100%",
        background: 'blue',
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
            username:'',
            password:''
        };
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({username: event.target.value});
    };
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    };
    handleChangeQuestion(event) {
        this.setState({question: event.target.value});
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
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Sign Up To StudyHour</Typography>

                        <form  autoComplete="off">
                        <Grid container>
                        <Grid item xs="12" className={classes.item}>
                            <TextField
                                id="standard-username-input"
                                
                                label="Username"
                                type="text"
                                className={classes.textField}
                                placeholder="User Name"
                                onChange={this.handleChangeUserName}
                                
                                required
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Signup)));