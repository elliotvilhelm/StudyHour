import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "./HeaderComponent/NavBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Typography, Grid} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';
import * as resetPassword_actions from '../actions/resetPassword_action';

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

class ResetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            newpassword:'',
            confirm: true,
        };
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount (){
        console.log("id in reset password file: ",this.props.location.state.id);
        this.setState({id: this.props.location.state.id});
    }

    handleChangeNewPassword(event) {
        this.setState({newpassword: event.target.value});
    };
    handleChangeConfirmPassword(event) {
        let password = this.state.newpassword;
        let input = event.target.value;
        if (password !== input && password !== '' && input !== '') {
            this.setState({confirm: false});
        }
        else {
            this.setState({confirm: true});
        }
    };
    handleSubmit() {
        if (this.state.confirm === true) {
            this.props.dispatch(resetPassword_actions.change(this.state.id, this.state.newpassword));
        }
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
                                        id="standard-password-input"
                                        label="New Password"
                                        className={classes.textField}
                                        type="password"
                                        placeholder="New Password"
                                        onChange={this.handleChangeNewPassword}
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
                                        placeholder="Confirm Password"
                                        onChange={this.handleChangeConfirmPassword}
                                        autocomplete='off'
                                        required
                                        style={{padding: "10px"}}
                                        error={!this.state.confirm}
                                    />
                                </Grid>
                                <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                    <Button id="submit-button"
                                            variant="contained"
                                            color="primary"
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