import axios from "axios";
import history from "../history";


export function signup(fullname, username, password, city, question, answer, bio) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/Signup',
            data: {
                fullname: fullname,
                user_name: username,
                password: password,
                city: city,
                security_q: question,
                security_a: answer,
                bio: bio,
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