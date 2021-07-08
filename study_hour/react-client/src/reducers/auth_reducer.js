import {AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED} from "../actions/auth";

/* 32.8801 N, 117.2340 W is UCSD Coordinates */
const initialState = {
    authenticated: false,
    location: {
        latitude: 32.8801,
        longitude: 117.2340,
    }, 
    error: false
};

export default function(state=initialState, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return Object.assign({}, state, {
                authenticated: true
            });
        case UNAUTHENTICATED:
            return Object.assign({}, state, {
                authenticated: false
            });
        case AUTHENTICATION_ERROR:
            return Object.assign({}, state, {
                error: action.payload
            });

        case LOCATION_FOUND:   
            return Object.assign({}, state,{
                location: action.payload
            });
        
        case LOCATION_ERROR:
            return Object.assign({}, state,{
                error: action.payload
            });
    }
    return state;
}

