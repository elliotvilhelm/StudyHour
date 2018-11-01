import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import Comment from './Comment'



class CommentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {comments: []}
    }

    render() {

        return (
            <div className="comments-table-div">
                <table>
                    <tr>
                        Comments
                    </tr>
                    <tr>
                        <Comment/>
                    </tr>
                    <tr>
                        <Comment/>
                    </tr>
                </table>
            </div>
        )
    }
}
export default CommentTable;
