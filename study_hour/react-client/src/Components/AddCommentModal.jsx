import React, {Component} from 'react';
import {Paper} from '@material-ui/core/';
import '../styles/style.css'
import {withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core/';
import Button from "@material-ui/core/Button/Button";
import {withRouter} from "react-router";
import connect from "react-redux/es/connect/connect";
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import Modal from "@material-ui/core/Modal/Modal";
import StarRatingComponent from "react-star-rating-component";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        // top: `${top}%`,
        // bottom: '50%',
        width: '50%',
        margin: 'auto',
        position: 'absolute',
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        // backgroundColor: 0xFFFFFF,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class AddCommentModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            rating: 0,
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.onStarClick = this.onStarClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleOpen () {
        this.setState({ open: true });
    };
    handleClose (){
        this.setState({ open: false });
    };
    handleChangeText(event) {
        this.setState({text: event.target.value});
    };
    // onStarClick(nextValue, prevValue, name) {
    //     this.setState({rating: nextValue});
    // }
    onStarClick(event) {
        this.setState({rating: event.target.value});
    }
    handleSubmit(event) {
        // this.props.dispatch(addlocation_actions.addlocation(this.state.name, this.state.address, this.state.outlet, this.state.internet));
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper style={{padding: "2%", width:"50%", margin:"auto", paddingLeft: "5%", paddingRight: "5%", marginTop: "5%"}}>
                <Button onClick={this.handleOpen}>Write a Review</Button>
                <Modal style={{backgroundColor: "white"}} open={this.state.open} onClose={this.handleClose}>
                    <div style={getModalStyle()} className={this.props.paper}>
                        <Typography variant="display1" id="modal-title">
                            Comment
                        </Typography>
                        <Grid item xs="12" className={classes.item}>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                editing={true}
                                onStarClick={this.onStarClick.bind(this)}
                            />
                        </Grid>
                        <Grid item xs="12" className={classes.item}>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                fullWidth
                                rows="4"
                                placeholder="Enter Comment"
                                onChange={this.handleChangeText}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs="12" style={{textAlign: "center", marginTop: 10}} className={classes.item}>
                            <Button id="submit-button"
                                    variant="contained"
                                    className={classes.button}
                                    onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </div>
                </Modal>
            </Paper>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(withStyles(styles)(withRouter(AddCommentModal)));