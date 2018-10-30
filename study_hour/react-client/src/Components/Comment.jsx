import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../styles/style.css'
import StarRatingComponent from "react-star-rating-component";



export class Comment extends Component {




    render(){

        return (
            <div className="comment-div">
               User: {this.props.user}
                <div>

                    <StarRatingComponent
                        name="rate star"
                        editing={false}
                        starCount={5}
                        value={this.props.rating}
                    />
                </div>

                <div>
                    {this.props.text}
                </div>
            </div>
        )
    }
}
export default Comment;
