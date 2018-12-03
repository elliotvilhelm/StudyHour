import axios from "axios";
import history from "../history";


export function deletecomment(comment_id) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/delete_comment',
            data: {
                comment_id: comment_id,
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                // if (response.data.success === false) return; // dispatch alert that name is taken
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}