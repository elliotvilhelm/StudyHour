import history from "../history";
import axios from "axios";


export function search(location) {
    return (dispatch) => {
        history.push('/Location/' + location.id);
    }
}

export function listResult(place) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/ListResult',
            data: {place: place},
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push({
                    pathname: '/Location',
                    state: {
                        list: response.data.dbrexsponse,
                        favorite: false
                    }
                })
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
