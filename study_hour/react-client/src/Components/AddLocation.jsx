import React, {Component} from 'react';
import {Paper} from '@material-ui/core/';
import {navBar} from './HeaderComponent/NavBar.jsx'
import '../styles/style.css'
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core/';
import Button from "@material-ui/core/Button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import NavBar from "./HeaderComponent/NavBar";
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
            outlet: false,
            internet: false,
            noise_level: 0,
            open_time: '',
            close_time: ''
        };
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeOutlet = this.handleChangeOutlet.bind(this);
        this.handleChangeInternet = this.handleChangeInternet.bind(this);
        this.handleChangeOpenTime = this.handleChangeOpenTime.bind(this);
        this.handleChangeCloseTime = this.handleChangeCloseTime.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeNoiseLevel = this.handleChangeNoiseLevel.bind(this);
        this.upload_ref = React.createRef();
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
    handleChangeOpenTime(event) {
        this.setState({open_time: event.target.value});
    };
    handleChangeCloseTime(event) {
        this.setState({close_time: event.target.value});
    };
    handleChangeNoiseLevel(event) {
        this.setState({noise_level: event.target.value});
    }

    handleSubmit() {
        this.props.dispatch(addlocation_actions.addlocation(this.state.name, this.state.address, this.state.outlet, this.state.internet, this.state.open_time, this.state.open_time, this.state.noise_level, this.upload_ref));
    }

    render() {
        const {classes} = this.props;
        const {outlet, internet} = this.state;
        return (
            <div>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <div className='addLocation-div'>
                            <Typography variant='display1'>Add Location</Typography>
                            <Grid container>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="standard-name-input"
                                        label="Name"
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
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="time"
                                        label="Open Time"
                                        type="time"
                                        defaultValue="00:00"
                                        className={classes.textField}
                                        onChange={this.handleChangeOpenTime}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <TextField
                                        id="time"
                                        label="Close Time"
                                        type="time"
                                        defaultValue="00:00"
                                        className={classes.textField}
                                        onChange={this.handleChangeCloseTime}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            step: 300, // 5 min
                                        }}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <Typography variant='subheading' style={{color: "white"}}>Noise Level</Typography>
                                    <input
                                        style={{margin: "auto"}}
                                        type="range"
                                        step="1"
                                        min="0"
                                        max="10"
                                        onChange={this.handleChangeNoiseLevel}
                                    />
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <FileUpload ref={this.upload_ref}/>
                                </Grid>
                                <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.handleSubmit}>
                                        Submit
                                    </Button>
                                </Grid>
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