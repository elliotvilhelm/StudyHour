import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SideBar from "./SideBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from "@material-ui/core/Button/Button";
import axios from "axios/index";
import * as signup_actions from "../actions/signup_action";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';
import history from '../history';
import { bindActionCreators } from 'redux'


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '40%',
        // marginRight: theme.spacing.unit,
        width: 200,
        background: 'blue'
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            // question:'',
            // answer:'',
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

                <SideBar/>
                <Paper className='paper'>
                    <div className='banner-div'>
                        <h1>Welcome to StudyHour</h1>
                    </div>
                    <div className='signup-div'>
                        <h2>Sign up</h2>
                        <form className = 'form'>
                            <TextField
                                id="standard-username-input"
                                label="Username"
                                type="text"
                                className={classes.textField}
                                placeholder="User Name"
                                onChange={this.handleChangeUserName}
                                autoComplete="username"
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                className={classes.textField}
                                type="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={this.handleChangePassword}
                            />
                            {/*<br/>*/}
                            {/*<h4>Give me your Security Question</h4>*/}
                            {/*<TextField*/}
                                {/*id="standard-question-input"*/}
                                {/*label="Password"*/}
                                {/*className={classes.textField}*/}
                                {/*type="password"*/}
                                {/*placeholder="Security question"*/}
                                {/*autoComplete="current-password"*/}
                                {/*onChange={this.handleChangeQuestion}*/}
                            {/*/>*/}
                            {/*<h4>Give me the answer to your Security Question</h4>*/}
                            {/*<TextField*/}
                                {/*id="standard-password-input"*/}
                                {/*label="Password"*/}
                                {/*className={classes.textField}*/}
                                {/*type="password"*/}
                                {/*placeholder="Answer to your question"*/}
                                {/*autoComplete="current-password"*/}
                                {/*onChange={this.handleChangeAnswer}*/}
                            {/*/>*/}
                            {/*<br />*/}
                            <Button id="submit-button"
                                    variant="contained"
                                    className={classes.button}
                                    onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </form>
                    </div>
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