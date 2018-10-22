import {AUTHENTICATED, AUTHENTICATION_ERROR, UNAUTHENTICATED} from "../actions/auth";

export default function(state={}, action) {
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
    }
    return state;
}

