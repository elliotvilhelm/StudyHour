import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import StarRatingComponent from "react-star-rating-component";
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'


const commentStyle = {
    padding: 5,
    margin: 5,
    width: '100%',
    backgroundColor: "#032B43",
    color: "white"
};
class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={commentStyle}>
                <Grid container spacing={16}>
                    <Grid item>
                        <Avatar style={{ backgroundColor: "grey" }}>{this.props.user_name}</Avatar>
                    </Grid>
                    <Grid item lg={true}>
                        <Typography color="inherit">{this.props.text}</Typography>
                    </Grid>
                    <StarRatingComponent
                        name="rate star"
                        editing={false}
                        starCount={5}
                        value={this.props.rating}
                    />
                </Grid>
            </Paper>
        )
    }
}
export default Comment;
