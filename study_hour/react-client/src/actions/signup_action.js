import axios from "axios";
import history from "../history";


export function signup(username, password) {
    axios({
        method: 'post',
        url: '/api/Signup',
        data: {username: this.state.username,
            password: this.state.password,
        },
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
        .then(function (response) {
            console.log("success on signup");
            console.log(response);
            localStorage.setItem('user', response.data.token);
            history.push('/Login');
            //self.props.dispatch(auth_actions.authenticate());
        })
        .catch(function (response) {
            console.log("Error on login db response",response);
        });
}