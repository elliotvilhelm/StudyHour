import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
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
                        <Avatar style={{ backgroundColor: "grey" }}>UserName</Avatar>
                    </Grid>
                    <Grid item lg={true}>
                        <Typography color="inherit">text: Hey</Typography>
                        <Typography color="inherit">Rating</Typography>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
}
export default Comment;
