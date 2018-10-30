import axios from "axios";
import history from "../history";


export function signup(username, password) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/Signup',
            data: {
                user_name: username,
                password: password,
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.success === false) return; // dispatch alert that name is taken
                localStorage.setItem('user', response.data.token);
                history.push('/Login');
            })
            .catch(function (response) {
                console.log("Error on login db response", response);
            });
    }
}