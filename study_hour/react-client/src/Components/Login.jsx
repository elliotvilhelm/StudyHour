import React, {Component, Fragment} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "./HeaderComponent/NavBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Typography} from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';
import {Button} from "@material-ui/core";
import * as auth_actions from "../actions/auth";
import * as resetPassword_actions from "../actions/resetPassword_action";
import { connect } from  "react-redux";
import { withRouter } from 'react-router-dom';

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
            submitted:false,
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

    formValidation(){
        const globalState = getState()
        const error = {}
        if(globalState.type === 'authentication_error'){
            
        } 
        
    }

    renderTextField = ({id, label, placeholder, onChange, autoComplete, type, meta: {touched, error}}) => {
        <TextField  id={id} 
                    label={label}
                    placeholder={placeholder} 
                    onChange={onChange} 
                    autoComplete={autoComplete}
                    errorText={touch && error} 
        />
    }

    render () {
        const { classes } = this.props;
        const { username, password, submitted } = this.state;
        return (

            <Fragment>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Login To StudyHour</Typography>
                        {/* ERROR BOX HERE */ }
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
                                {submitted && !username && <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>}
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
                                {submitted && !password && <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>}
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
