import axios from "axios";
import history from '../history';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticated_user';
export const AUTHENTICATION_ERROR = 'authentication_error';


export function authenticate(username, password) {
    axios({
        method: 'post',
        url: '/api/Login',
        data: {user_name: username,
            password: password,
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
        .then(function (response) {
            console.log("respone", response)
            if (!response.auth) return;
            console.log("success on login");
            console.log(response);
            localStorage.setItem('user', response.data.token);
            history.push('/Home');
        })
        .catch(function (response) {
            console.log("Error on login db response", response);
        });
    return {
        type: AUTHENTICATED
    };
}

export function unauthenticate() {
    localStorage.clear();
    return {
        type: UNAUTHENTICATED
    };
}
