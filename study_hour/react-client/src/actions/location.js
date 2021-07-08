import axios from "axios";
import history from '../history';

export const LOCATION_FOUND = 'location_found';
export const LOCATION_ERROR = 'location_error';

export function foundLocation(location){
  return (dispatch) => {
    localStorage.setItem('user', response.data.token);
    history.push('/Home');
    dispatch({
      type: LOCATION_FOUND,
      location: location
    });
  }
}

export function errorLocation(){
  return{
    type: LOCATION_ERROR
  };
}