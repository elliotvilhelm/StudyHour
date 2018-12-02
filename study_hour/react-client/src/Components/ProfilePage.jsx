import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Paper} from '@material-ui/core'
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import axios from "axios";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            city: '',
            bio: '',
            numComments: '',
        }
    }
    componentDidMount (){
        axios({
            method: 'post',
            url: `/api/Profile`,
            data: {id: localStorage.getItem('user_id')},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            console.log("profile page response: ",response.data.dbresponse[0]);
            this.setState({
                fullname: response.data.dbresponse[0].fullname,
                city: response.data.dbresponse[0].city,
                bio: response.data.dbresponse[0].bio
            });
        }).catch(function (response) {
            console.log("Error",response);
        });
        axios({
            method: 'post',
            url: `/api/commentCounts`,
            data: {id: localStorage.getItem('user_id')},
            config: { headers: {'Content-Type': 'application/json' }}
        }).then(response => {
            console.log("profile page response: ",response.data.dbresponse[0]);
            this.setState({
                numComments: response.data.dbresponse[0].numcomment
            });
            console.log("count", this.state.count);
        }).catch(function (response) {
            console.log("Error",response);
        });
    }

    render() {
        if (this.state.url !== "") {
            var imgl = <div></div>;
        }
        else
            var imgl = <div></div>;
        return (
            <div>
                <Paper className='wallpaper'>
                    <NavBar/>
                    <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                        <Typography variant="headline" style={{padding: "5%"}}>{this.state.fullname}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>{this.state.city}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>{this.state.bio}</Typography>
                        <Typography variant="headline" style={{padding: "5%"}}>{this.state.numComments}</Typography>
                    </Paper>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(ProfilePage);
