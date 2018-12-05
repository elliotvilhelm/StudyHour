import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import StarRatingComponent from "react-star-rating-component";
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'


const commentStyle = {
    padding: 5,
    margin: 5,
    width: '100%',
    backgroundColor: "#D3D3D3",
    color: "white"
};
class LocationThumbnail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper style={commentStyle}>
                <Grid container spacing={16}>
                    <Grid item lg={true}>
                        <Typography color="inherit">{this.props.name}</Typography>
                        <Typography color="inherit">{this.props.address}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
export default LocationThumbnail;
