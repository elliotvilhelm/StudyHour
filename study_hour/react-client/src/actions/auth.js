import axios from "axios";
import history from '../history';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';


export function authenticate(username, password) {
    return (dispatch) =>
    {

        axios({
            method: 'post',
            url: '/api/Login',
            data: {
                user_name: username,
                password: password,
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (!response.data.auth) return;
                localStorage.setItem('user', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                history.push('/Home');
                dispatch({type: AUTHENTICATED});
            })
            .catch(function (response) {
                console.log("Error on login db response", response);
            });

    }
}

export function unauthenticate() {
    localStorage.clear();
    
    return {
        type: UNAUTHENTICATED
    };
}
