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

class SecurityCheck extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:'',
            security_q:'',
            security_a:'',
            userInput:'',
            correct: true,
        };
        this.handleSecurityAnswer = this.handleSecurityAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount (){
        this.setState({
            id: this.props.location.state.id,
            security_q: this.props.location.state.security_q,
            security_a: this.props.location.state.security_a
        });
    }

    handleSecurityAnswer(event) {
        this.setState({userInput: event.target.value});
    }

    handleSubmit() {
        if (this.state.security_a === this.state.userInput) {
            console.log("id in security check file: ",this.state.id);
            this.props.dispatch(resetPassword_actions.validateUser(this.state.id, this.state.security_a, this.state.userInput));
        }
        else {
            this.setState({correct: false});
        }
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
                                <Typography varint='display4' style={{padding: "10px"}}>Previously set security question</Typography>
                                <Typography varint='display4' style={{padding: "10px"}}>{this.state.security_q}</Typography>
                            </Grid>
                            <Grid item xs="12" className={classes.item}>
                                <TextField
                                    id="sequrity_answer"
                                    label="Sequrity Answer"
                                    placeholder="Sequrity Answer"
                                    onChange={this.handleSecurityAnswer}
                                    autoComplete='off'
                                    type="test"
                                    className={classes.textField}
                                    required
                                    style={{padding: "10px"}}
                                    error={!this.state.correct}
                                />
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(SecurityCheck)));