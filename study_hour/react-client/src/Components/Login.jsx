import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SideBar from "./SideBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from "@material-ui/core/Button/Button";
import * as auth_actions from "../actions/auth";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';

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
        this.props.dispatch(auth_actions.authenticate(this.state.username, this.state.password));
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
        authenticated: state
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(Login)));
