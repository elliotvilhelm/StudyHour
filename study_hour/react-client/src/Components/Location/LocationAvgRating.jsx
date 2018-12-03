import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import '../../styles/style.css'
import axios from "axios";
import StarRatings from "react-star-ratings";


function calculateAvgRate(ratingList) {
    let stars = 0;
    let counts = 0;
    let rate;
    for (rate = 0; rate < ratingList.length; ++rate) {
        stars += Number(ratingList[rate].rating);
        counts++;
    }
    if (counts == 0)
        return 0;
    return stars/counts;
}

class LocationAvgRating extends Component {
    constructor(props) {
        super(props);
        this.state={
            ratings:[],
            avgRate: 0
        };
    }
    componentDidMount (){
        axios({
            method: 'post',
            url: '/api/Location/Comments/Ratings',
            data: {location: this.props.location_id},
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            this.setState({ratings: response.data.dbresponse});
            this.setState({avgRate: calculateAvgRate(this.state.ratings)});
        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    render() {
        return (
            <div className="display-avg-rating">
                <StarRatings
                    name="rate1"
                    starRatedColor="gold"
                    starEmptyColor="black"
                    starDimension={'50px'}
                    rating={this.state.avgRate}
                    editing={false}
                />
            </div>
        )
    }
}
export default LocationAvgRating;
