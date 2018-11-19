import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../history";
import * as auth_actions from "../actions/auth";
import Typography from "@material-ui/core/Typography/Typography";



class CommentTable extends Component {
    constructor(props) {
        super(props);
        //this.state = {comments: [{user: "elliot", text: "hey baby", rating: 2},
                //{user:"john", text: "heyyyyy", rating:2}], table: []}
        this.state={comments:[]};

        this.createTable = this.createTable.bind(this);

    }
    componentDidMount (){
        this.createTable();
    }
    createTable() {
        axios({
            method: 'post',
            url: '/api/Location/Comments',
            data: {location: this.props.location_id},
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {


               console.log("response", response.data.dbresponse);
             this.setState({comments: response.data.dbresponse});

            let table = this.state.comments.map(comment =>
                <tr>
                    <Comment user_name={comment.user_name}
                             rating = {comment.rating}
                             text={comment.text}/>
                </tr>
            );
            this.setState({table: table});

        })
            .catch(function (response) {
                console.log("Error",response);
            });




    }

    render() {
        return (
            <div className="comments-table-div">
                <table>
                    <tr>
                        <Typography variant="display3">
                        Comments
                        </Typography>
                    </tr>
                    {this.state.table}
                </table>
            </div>
        )
    }
}
export default CommentTable;
