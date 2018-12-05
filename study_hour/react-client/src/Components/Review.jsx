import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import connect from "react-redux/es/connect/connect";
import {withStyles} from "@material-ui/core/styles";
import StarRatingComponent from 'react-star-rating-component';
import CommentTable from './Comments/CommentTable'
import SideBar from "./SideBar";
import {Paper} from "@material-ui/core";

class Review extends Component{

    constructor() {
        super();

        this.state = {
            rating: 0
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const { rating } = this.state;

        return (
            <div>
                <tr>
                    <CommentTable/>
                </tr>
            </div>
        );
    }


}


function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Review);
