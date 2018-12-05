import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import Comment from './Comment'
import axios from "axios";
import history from "../../history";
import Typography from "@material-ui/core/Typography/Typography";
import AddCommentModal from "./AddCommentModal";
import Footer from "../FooterComponent/Footer";


class CommentTable extends Component {
    constructor(props) {
        super(props);
        //this.state = {comments: [{user: "elliot", text: "hey baby", rating: 2},
        //{user:"john", text: "heyyyyy", rating:2}], table: []}
        this.state={comments:[], self_comment:false};
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

            this.setState({comments: response.data.dbresponse});
            console.log("this is comments", this.state.comments);
            let table = this.state.comments.map(comment =>
                <tr style={{width: '100%'}}>
                    <Comment
                             user_id={comment.user_id}
                             user_name={comment.fullname}
                             rating = {comment.rating}
                             text={comment.text}
                             comment_id={comment.id}
                             on_delete={this.createTable}
                    />

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
                <table className="table-comments">
                    <th style={{float: 'left'}}>
                        <Typography variant="display3">
                            Comments
                        </Typography>
                    </th>
                    <th style={{float: 'right'}}>
                        <AddCommentModal createTable={this.createTable} location_id={this.props.location_id}/>
                    </th>
                    {this.state.table}
                </table>
                <Footer/>
            </div>
        )
    }
}
export default CommentTable;
