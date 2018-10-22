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

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: '40%',
        // marginRight: theme.spacing.unit,
        width: 200,
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
        this.state={
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
                authenticated: false
            },
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success'=
                console.log("suceessss")
                console.log(response);
                localStorage.setItem(username, response.data.token);

                history.push('/Home');
                self.props.store.dispatch(auth_actions.AUTHENTICATED);
            })
            .catch(function (response) {
                //handle error
                console.log("db respone",response);
            });
    }

    render () {
        const { classes } = this.props;

        console.log(this.state);
        return (
            <div>
                <SideBar/>
                <Paper className='paper'>
                    <div className='login-div'>
                        <h1>YOU WANNA LOGIN??</h1>
                        <TextField
                            id="standard-email"
                            label="Email"
                            className={classes.textField}
                            onChange={this.handleChangeUserName}
                        />
                        <br/>
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            onChange={this.handleChangePassword}
                        />
                        <Button variant="contained" className={classes.button}
                            onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.authenticated
    }
}
// export default withStyles(styles)(Login);
export default connect(mapStateToProps)(withStyles(styles)(withRouter(Login)));