import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SideBar from "./SideBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from "@material-ui/core/Button/Button";
import axios from "axios/index";
import * as auth_actions from "../actions/auth";
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

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            authenticated: false
        };
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUserName(event) {
        this.setState({username: event.target.value});
    };
    handleChangePassword(event) {
        this.setState({password: event.target.value});
    };
    handleSubmit(event) {
        console.log("buttonClick");
        // axios.post(`/api/Login`, {
        //     username: this.state.username,
        //     password: this.state.password
        // });
        let self = this;
        console.log("props", this.props)
        let username = this.state.username;
        axios({
            method: 'post',
            url: '/api/Login',
            data: {username: this.state.username,
                password: this.state.password,
            },
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                console.log("success on login");
                console.log(response);
                localStorage.setItem('user', response.data.token);
                history.push('/Home');
                self.props.dispatch(auth_actions.authenticate());
            })
            .catch(function (response) {
                console.log("Error on login db response",response);
            });
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
                    <div className='login-div'>
                        <h2>Login</h2>
                        <form>
                        <TextField
                            id="standard-email"
                            label="Email"
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
                        <Button variant="contained"
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Login)));
