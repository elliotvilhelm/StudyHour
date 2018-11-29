import axios from "axios";
import history from "../history";


export function addcomment(text, rating, outlet, internet, user_id, location_id) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/AddCommentModal',
            data: {
                text: text,
                rating: rating,
                outlet: outlet,
                internet: internet,
                user_id: user_id,
                location_id: location_id,
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push('/Location/' + location_id);
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
