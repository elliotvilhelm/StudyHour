import axios from "axios";
import history from "../history";


export function addcomment(text, rating, outlet, internet) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/AddCommentModal',
            data: {
                text: text,
                rating: rating,
                outlet: outlet,
                internet: internet
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                console.log(response.data);
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push('/Location/' + response.data.location_id);
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
