import React, {Component} from 'react';


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';

import selfie from '../../images/Octocat.jpg'

const styles = {
    card: {
	maxWidth: 300,
	width: "auto",
	margin: "auto",
    },

    action: {
	width: '100%',
	display: "flex",
	alignItems: "flex-start"
    },
    media: {
	// ⚠️ object-fit is not supported by IE11.
	width: 150,	
	objectFit: 'cover',
    },
};

class Review extends Component{

    constructor(props) {
        super(props);    
    }

    render() {
	const { classes } = this.props;

	
	return  (
	    <Card className={classes.card}>
	      <CardActionArea className={classes.action}>

		<div>
		  <CardMedia
		    component="img"
		    alt="a cat"
		    className={classes.media}
		    image={selfie}
		    title="cat"
		    />

		  <ul>

		  </ul>
		  <Button size="small" color="primary">
		    Share
		  </Button>
		  <Button size="small" color="primary">
		    Learn More
		  </Button>
		</div>
		

		<CardContent>
		  <Typography style={{textAlign: "left"}} gutterBottom variant="headline" component="h2">
		    Cat
		  </Typography>
		  <Typography component="p">
		    A sexy-ass being.
		  </Typography>
		</CardContent>
	      </CardActionArea>
	    </Card>
	);
    }
    
}


export default withStyles(styles)(Review);
