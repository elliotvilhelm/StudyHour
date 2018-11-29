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
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import FileUpload from "./FileUpload";
import * as addcomment_actions from "../actions/addcomment_action";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
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
            outlet: false,
            internet: false,
            open: false,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeOutlet = this.handleChangeOutlet.bind(this);
        this.handleChangeInternet = this.handleChangeInternet.bind(this);
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
    handleChangeInternet(event) {
        this.setState({internet: event.target.checked});
    };
    handleChangeOutlet(event) {
        this.setState({outlet: event.target.checked});
    };
    onStarClick(event) {
        if (event.target.value === undefined) {
            event.target.value = "";
        }
        this.setState({rating: event.target.value});
    }
    handleSubmit(event) {
        this.props.dispatch(addcomment_actions.addcomment(this.state.text, this.state.rating, this.state.outlet, this.state.internet));
    }

    render() {
        const {classes} = this.props;
        return (
            <Paper style={{width:"100%", margin:"auto", padding: "10px"}}>
                <Button onClick={this.handleOpen}>Add Comment</Button>
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
                            <FormControlLabel
                                style={{paddingLeft: "5%"}}
                                className={classes.textField}
                                control={
                                    <Checkbox checked={this.state.outlet} style={{color: "white"}} onChange={this.handleChangeOutlet}/>
                                }
                                label="outlet"
                        />
                        </Grid>
                        <Grid item xs="12" className={classes.item}>
                            <FormControlLabel
                                style={{paddingLeft: "5%"}}
                                className={classes.textField}
                                control={
                                    <Checkbox checked={this.state.internet} style={{color: "white"}} onChange={this.handleChangeInternet} />
                                }
                                label="internet"
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