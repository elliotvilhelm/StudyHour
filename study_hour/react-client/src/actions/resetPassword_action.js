import axios from "axios";
import history from "../history";


export function resetPassword() {
    return (dispatch) => {
        history.push('/ValidateUser');
    }
}

export function getQuestion(username) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/GetQuestion',
            data: {
                user_name: username
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                console.log("returned data:",response.data.dbresponse[0]);
                history.push({
                    pathname: '/SecurityCheck',
                    state: {id: response.data.dbresponse[0].id,
                            security_q: response.data.dbresponse[0].security_q,
                            security_a: response.data.dbresponse[0].security_a}
                });
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
export function validateUser(id, security_a, userInput) {
    return (dispatch) => {
        if (security_a === userInput) {
            history.push({
                pathname: '/ResetPassword',
                state: {id: id}
            });
        }
    }
}

export function change(id, password) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/savePassword',
            data: {
                id: id,
                password: password
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push('/Login');
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
