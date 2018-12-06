import {Component} from "react";
import React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import studyhour from '../../images/studyhour.png';


class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Paper style={{padding: "1%", width:"100%", margin:"auto", position: 'relative', top: 'calc(100% - 60px)', height: 60}}>
                <Grid container spacing={12}>
                    <Grid item xs={4}>
                        <Typography variant="body2" gutterBottom align="center"> About </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" gutterBottom align="center"> Privacy </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="body2" gutterBottom align="center"> Terms </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="caption" gutterBottom align="center">
                            Copyright © 2018-2018 Banana Inc. Study Hour
                            <img src={studyhour} width={40} hspace="15"/>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Footer;
