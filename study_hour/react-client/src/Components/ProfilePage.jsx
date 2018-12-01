import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import NavBar from './HeaderComponent/NavBar'
import {Paper} from '@material-ui/core'
import Map from './Map'
import { connect } from "react-redux";
import FileUpload from './FileUpload';
import BackgroundMusic from './Youtube';
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ImageLoader from 'react-image-file';
import TextField from "@material-ui/core/TextField";
import SearchBar from './SearchBar';

let user = {
    user_id: "1",
    city: "San Diego",
    user_name: "Roger Cheng",
    comment_count: "10",
    user_password: "fml",

}

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {user: {}}

    }
    componentDidMount (){
        let id = this.props.match.params.id;
        let self = this;
        axios({
            method: 'get',
            url: `/api/Profile/${id}`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            console.log("response user/n", response.data.dbresponse);
            response = response.data.dbresponse[0];
            self.setState({
                user:
                    {
                        user_id: response.user_id,
                        user_name: response.user_name,
                        user_password: response.password,
                        city: "San Diego",
                        comment_count: "5",
                        photos_count: "3"
                    }

            });
        }).catch(function (response) {
            console.log("Error",response);
        });

    }

    render() {
        if (this.state.url !== "") {
            // var imgl = <img src={this.state.url} />;
            var imgl = <div></div>;
        }
        else
            var imgl = <div></div>;
        return (
            <Paper className='wallpaper'>
                <NavBar/>
                <div>
                    {this.state.user.user_name}
                </div>
                <div>
                    {this.state.user.user_password}
                </div>
                <div>
                    {this.state.user.city}
                </div>
                <div>
                    {this.state.user.comment_count}
                </div>
                <div>
                    {this.state.user.photos_count}
                </div>

            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}

export default connect(mapStateToProps)(ProfilePage);
