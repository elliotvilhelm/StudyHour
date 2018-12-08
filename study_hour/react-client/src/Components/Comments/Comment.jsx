import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import StarRatingComponent from "react-star-rating-component";
import { Avatar, Paper, Typography, Grid, Button } from '@material-ui/core';
import default_profile from '../../images/default.jpg';
import {Link} from "react-router-dom";
import {deletecomment} from "../../actions/deletecomment_action";
import { connect } from  "react-redux";
import axios from "axios";


const commentStyle = {
    padding: 5,
    margin: 1,
    width: '100%',
    // backgroundColor: "#484e63",
    backgroundColor: "#283255",
    color: "white"
};
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state={
            url: default_profile
        };
        this.handleDelete=this.handleDelete.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: '/api/profile_image/',
            params: {user_id:  this.props.user_id},
            data: null,
            config: {headers: {'Content-Type': 'application/json'}},
        }).then(response => {
            console.log("response for getting profile image", response.data);
            if (response.data.length === 0)
                return;
            axios({
                method: 'post',
                url: `/api/images`,
                config: { headers: {'Content-Type': 'multipart/form-data' }},
                data: {code: response.data[0].s3code}
            }).then(response => {
                console.log("da url", response.data.url);
                this.setState({url: response.data.url})
            }).catch(function (response) {
                console.log("Error",response);
            });
        });
    }

    handleEdit(event){
         //this.EditOnclick();
    }

    handleDelete(event){
        this.props.dispatch(deletecomment(this.props.comment_id));
        this.props.on_delete();
    }

    render() {
        console.log("user_id: ",this.props.user_id);
        if(this.props.user_id.toString() === localStorage.getItem('user_id')) {
            return (
                <Paper style={commentStyle}>
                    <Grid container spacing={24}>
                        <Grid item>
                            <Link to={`/Home/ProfilePage/${this.props.user_id}`}>
                                <Grid container justify="center" alignItems="center">
                                    <Avatar src={this.state.url} style={{margin: 10, width: 60, height:60}}/>
                                </Grid>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="display1">{this.props.user_name}</Typography>
                        </Grid>
                        <Grid item lg style={{textAlign: 'right'}}>
                            <Button onClick={this.handleEdit}>Edit</Button>
                            <Button onClick={this.handleDelete}>Delete</Button>
                            <StarRatingComponent
                                name="rate star"
                                editing={false}
                                starCount={5}
                                value={this.props.rating}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="inherit" style={{paddingLeft: '5%', textAlign:'left'}}>{this.props.text}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )
        }
        else{
       return (
                <Paper style={commentStyle}>
                    <Grid container spacing={24}>
                        <Grid item>
                            <Link to={`/Home/ProfilePage/${this.props.user_id}`}>
                                <Grid container justify="center" alignItems="center">
                                    <Avatar src={this.state.url} style={{margin: 10, width: 60, height:60}}/>
                                </Grid>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Typography variant="display1">{this.props.user_name}</Typography>
                        </Grid>
                        <Grid item lg style={{textAlign: 'right'}}>
                            <StarRatingComponent
                                name="rate star"
                                editing={false}
                                starCount={5}
                                value={this.props.rating}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="inherit" style={{paddingLeft: '5%', textAlign: 'left'}}>{this.props.text}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            )



        }
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state
    }
}

export default connect(mapStateToProps)(Comment);
