import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import NavBar from "./HeaderComponent/NavBar";
import '../styles/style.css'
import { withStyles } from '@material-ui/core/styles';
import {TextField, Typography, Grid} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import axios from "axios/index";
import * as signup_actions from "../actions/signup_action";
import { connect } from  "react-redux";
import { withRouter} from 'react-router-dom';
import LocationThumbnail from './LocationThumbnail'
import history from '../history';
import { bindActionCreators } from 'redux'



const styles = theme => ({
    // textField: {
    //     marginLeft: '40%',
    //     // marginRight: theme.spacing.unit,
    //     width: 200,
    //     background: 'blue'
    // },
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

class ProfilePage extends Component {
    constructor(props){
        super(props);

        this.state = {locations: [], table: [],word: "A"}
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeword = this.changeword.bind(this);

    }

    changeword(){
        this.setState({ word:"B" });
    };

    componentDidMount (){
        this.createTable();
    }

    createTable() {
     axios({
            method: 'post',
            url: '/api/Locations',
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {


               console.log("response", response.data.dbresponse);
             this.setState({locations: response.data.dbresponse});

            let table = []
            table = this.state.locations.map(location =>
                <tr>
                    <LocationThumbnail name={location.name} address={location.address}/>
                </tr>
            )
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });


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
                <NavBar/>
                <Paper className='wallpaper'>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{marginBottom: "5%"}}>ELLIOT POURMAND</Typography>
                        <img class="profilename" src="https://raw.githubusercontent.com/Infernus101/ProfileUI/0690f5e61a9f7af02c30342d4d6414a630de47fc/icon.png" />
                        <form  autoComplete="off">
                            <Grid container>
                                <Grid item xs="12" className={classes.item}>
                                    <Typography variant={"h6"} style={{}}>Comments Made: 110</Typography>
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <Typography variant={"h6"} style={{}}>City: San Diego</Typography>
                                </Grid>
                                <Grid item xs="12" className={classes.item}>
                                    <Typography variant={"h6"} style={{}}>Favorite Locations: </Typography>
                                </Grid>
                                <Button onClick={this.changeword}>{this.state.word}</Button>
                                <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                                    <Button id="submit-button"
                                            variant="contained"
                                            className={classes.button}
                                            onClick={this.handleSubmit}>
                                       Edit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                        <Grid>
                        {this.state.table}
                        </Grid>
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

export default connect(mapStateToProps)(withStyles(styles)(withRouter(ProfilePage)));

// export default connect(mapStateToProps)(withStyles(styles)(withRouter(ProfilePage)));