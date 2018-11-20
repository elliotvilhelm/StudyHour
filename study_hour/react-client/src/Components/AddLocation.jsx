import React, {Component} from 'react';
import {Paper} from '@material-ui/core/';
import SideBar from "./SideBar";
import {navBar} from './HeaderComponent/NavBar.jsx'
import '../styles/style.css'
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core/';
import Button from "@material-ui/core/Button/Button";
import axios from "axios/index";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import NavBar from "./HeaderComponent/NavBar";
import Map from "./Map";
import Grid from "@material-ui/core/Grid/Grid";
import * as addlocation_actions from "../actions/addlocation_action";
import FileUpload from './FileUpload'


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
             // outlet: false,
            internet: false,
            // noise_level: '',
            // open_time: '',
            // close_time: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeOutlet = this.handleChangeOutlet.bind(this);
        this.handleChangeInternet = this.handleChangeInternet.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeName(event) {
        this.setState({name: event.target.value});
    };
    handleChangeAddress(event) {
        this.setState({address: event.target.value});
    };
    handleChangeInternet(event) {

        this.setState({internet: event.target.checked});
    };
    handleChangeOutlet(event) {
        this.setState({outlet: event.target.checked});
    };

    handleSubmit(event) {
        this.props.dispatch(addlocation_actions.addlocation(this.state.name, this.state.address, this.state.outlet, this.state.internet));
    }

    render() {
        const {classes} = this.props;
        const {location, outlet, internet} = this.state;
        return (
            <div>
                <NavBar/>
                <Paper className='wallpaper'>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <div className='addLocation-div'>
                            <Typography variant='display1'>Add Location</Typography>
                            <Grid container>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-name-input"
                                        label="name"
                                        type="text"
                                        className={classes.textField}
                                        placeholder="Location Name"
                                        onChange={this.handleChangeName}
                                        autoComplete="name"
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-address-input"
                                        label="Address"
                                        className={classes.textField}
                                        type="address"
                                        placeholder="Address"
                                        autoComplete="address"
                                        onChange={this.handleChangeAddress}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <FormControlLabel
                                        className={classes.textField}
                                        control={
                                            <Checkbox checked={outlet} style={{color: "white"}} onChange={this.handleChangeOutlet}/>
                                        }
                                        label="outlet"
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <FormControlLabel
                                        className={classes.textField}
                                        control={
                                            <Checkbox checked={internet} style={{color: "white"}} onChange={this.handleChangeInternet} />
                                        }
                                        label="internet"
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
                                <FileUpload/>
                            </Grid>

                        </div>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(AddLocation)));