import {Link} from 'react-router-dom';
import Typography from "@material-ui/core/Typography/Typography";
import LocationAvgRating from "./LocationAvgRating";
import React from 'react';


function location_card(props) {
    const location = props.location;
    const onMouseOver = props.onMouseOver;

    const location_img = <img src={location.image_url} style={{borderRadius: '2%'}} width='500' height='350'/>;
    const no_img = <Typography variant='headline' color='error'>No Image Found</Typography>;
    return (
    <div onMouseOver={onMouseOver(location)} location={location}
    className="location-card" style={{marginTop: '2%', backgroundColor: 'rgba(0,0,0,0.7)', width: '100%', borderRadius: 10}} >
        <Link to={'/Location/' + location.id}>
            <div className="locationImage-card">
                {location.image_id !== -1 ? location_img : no_img}
            </div>
        </Link>
        <div className="locationInfo-card">
            <Link to={'/Location/' + location.id}>
                <div className="location-name">
                    <Typography variant="headline"
                                >{location.name}</Typography>
                    <Typography variant='caption'
                                >{location.address}</Typography>
                </div>
            </Link>
            <div>
                <LocationAvgRating  location_id={location.id}/>
            </div>
        </div>
    </div>
    );
}

export default location_card;