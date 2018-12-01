import history from "../history";
import axios from "axios";


export function search(location) {
    return (dispatch) => {
        console.log(location.id);
        history.push('/Location/' + location.id);
    }
}

export function listResult(place) {
    return (dispatch) => {
        axios({
            method: 'get',
            url: '/api/ListResult',
            data: {place: place},
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                console.log("HERE?");
                console.log(response.data);
                // history.push('/Location/' + location_id);
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
