import React from 'react'
import { Avatar, Paper, Typography, Grid } from '@material-ui/core'


const commentStyle = {
    padding: 5,
    margin: 5,
    backgroundColor: "#032B43",
    color: "white"
};

const miniCom = ({ comments }) => (
    comments.map(comment => (

        <Paper style={commentStyle}>

            <Grid container spacing={16}>

                    <Grid item>
                        <Avatar style={{ backgroundColor: "grey" }}>{comment.name[0]}</Avatar>
                    </Grid>
                    <Grid item xs>
                        <Typography color="inherit">{comment.text}</Typography>
                        <Typography color="inherit">{comment.rating}</Typography>
                    </Grid>

            </Grid>
        </Paper>
    ))

);

export default miniCom;
