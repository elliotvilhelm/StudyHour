import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'



class CommentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {comments: [{user: "elliot", text: "hey baby", rating: 2},
                {user:"john", text: "heyyyyy", rating:2}], table: []}

        this.createTable = this.createTable.bind(this);

    }
    componentDidMount (){
        this.createTable();
    }
    createTable() {
        let table = []
        table = this.state.comments.map(comment =>
            <tr><Comment user={comment.user}
                         rating = {comment.rating}
                         text={comment.text}/></tr>
        )

        this.setState({table: table});
    }

    render() {
        return (
            <div className="comments-table-div">
                <table>
                    <tr>
                        <h2>Comments</h2>
                    </tr>
                    {this.state.table}
                    {/*{this.createTable()}*/}
                </table>
            </div>
        )
    }
}
export default CommentTable;
