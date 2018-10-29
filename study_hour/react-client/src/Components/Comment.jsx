import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'



class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="comment-div">
                <h3>User: Elliot</h3>
                <div>
                    <p>I love this location</p>
                </div>
            </div>
        )
    }
}
export default Comment;
