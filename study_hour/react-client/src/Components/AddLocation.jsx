import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import SideBar from "./SideBar";
import '../styles/style.css'
import {withStyles} from '@material-ui/core/styles';
import TextField from 'material-ui/TextField';
import Button from "@material-ui/core/Button/Button";
import axios from "axios/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";


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
    root: {
        display: 'flex',
        marginLeft: '40%'
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
});

class AddLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            outlet: false,
            internet: false,
            // noise_level: '',
            // open_time: '',
            // close_time: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
        //this.handleChangeOutlet = this.handleChangeOutlet.bind(this);
        //this.handleChangeInternet = this.handleChangeInternet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    };
    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    };
    /*
    handleChangeInternet(event) {
        this.setState({outlet: event.target.checked});
    };
    handleChangeOutlet(event) {
        this.setState({internet: event.target.checked});
    };
    */

    handleChangeCheckbox(name) {
      return function(event)  {
        this.setState({ [name]: event.target.checked });
      };
    }

    handleSubmit(event) {
        //this.props.dispatch(signup_actions.signup(this.state.username, this.state.password));
    }

    render() {
        const {classes} = this.props;
        const {location, outlet, internet} = this.state;

        return (
            <div>

                <SideBar/>
                <Paper className='paper'>
                    <div className='banner-div'>
                        <h1>Welcome to StudyHour</h1>
                    </div>
                    <div className='addLocation-div'>
                        <h2>Add Location</h2>
                        <form className='form'>
                            <TextField
                                id="standard-name-input"
                                label="name"
                                type="text"
                                className={classes.textField}
                                placeholder="Location Name"
                                onChange={this.handleChangeName}
                                autoComplete="name"
                                //value={location.name}
                            />
                            <TextField
                                id="standard-address-input"
                                label="Address"
                                className={classes.textField}
                                type="address"
                                placeholder="Address"
                                autoComplete="address"
                                onChange={this.handleChangeAddress}
                               // value={location.address}
                            />
                            <FormGroup id="addLocation-checkbox">
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={outlet} onChange={this.handleChangeCheckbox('outlet')}/>
                                    }
                                    label="outlet"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={internet} onChange={this.handleChangeCheckbox('internet')} />
                                    }
                                    label="internet"
                                />
                            </FormGroup>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(AddLocation)));