import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import StarRatingComponent from "react-star-rating-component";
import { Avatar, Paper, Typography, Grid, Button } from '@material-ui/core'
import default_profile from '../images/profile_pic.png';
import home from "../images/home.svg";
import {Link} from "react-router-dom";


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
    }

    render() {
        return (
            <Paper style={commentStyle}>
                <Grid container spacing={24}>
                    <Grid item>
                        <Link to={`/Home/ProfilePage/${this.props.user_id}`}>
                            <Avatar style={{ backgroundColor: "grey" }}>
                                <img className="img-avatar" src={default_profile}/>
                            </Avatar>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Typography variant="subheading">{this.props.user_name}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography color="inherit">{this.props.text}</Typography>
                    </Grid>
                    <Grid item lg style={{textAlign: 'right'}}>
                        <StarRatingComponent
                            name="rate star"
                            editing={false}
                            starCount={5}
                            value={this.props.rating}
                        />
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
export default Comment;
