import React, {Component, Fragment} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "./HeaderComponent/NavBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Grid, Typography} from '@material-ui/core';
import {Button} from "@material-ui/core";
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

class ValidateUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
        };
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({username: event.target.value});
    }

    handleEnter() {
        this.props.dispatch(resetPassword_actions.getQuestion(this.state.username));
    }

    render () {
        const { classes } = this.props;
        return (

            <Fragment>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>Forgot password?</Typography>
                        <Grid container>
                            <Grid item xs="12" className={classes.item}>
                                <TextField
                                    id="user_name"
                                    label="User Name"
                                    placeholder="User Name"
                                    onChange={this.handleChangeUserName}
                                    autoComplete='off'
                                    type="test"
                                    className={classes.textField}
                                    required
                                    style={{padding: "10px"}}
                                />
                            </Grid>
                             <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                <Button variant="contained"
                                        className={classes.button}
                                        onClick={this.handleEnter}
                                        color="primary"
                                >
                                    Enter
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(ValidateUser)));
