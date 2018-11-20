import React, {Component} from 'react';
import {Paper} from '@material-ui/core';
import SideBar from "./SideBar";
import '../styles/style.css'
import Comment from './Comment'
import CommentTable from './CommentTable'


class About extends Component {
    render() {
        return (
            <div>
                <SideBar/>
                <Paper className='paper'>
                    <CommentTable/>
                </Paper>
            </div>
        )
    }
}

export default About;
