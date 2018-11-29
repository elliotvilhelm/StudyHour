import axios from "axios";
import history from "../history";


export function search(location) {
    return (dispatch) => {
        console.log(location.id);
        history.push('/Location/' + location.id);
        // axios({
        //     method: 'get',
        //     url: '/api/searchedResult',
        //     data: {
        //         id: location.id,
        //     },
        //     config: {headers: {'Content-Type': 'multipart/form-data'}}
        // })
        //     .then(function (response) {
        //         console.log("hhuh");
        //         console.log(location.id);
        //         console.log("here");
        //         console.log(response.data.location_id);
        //         if (response.data.success === false) return; // dispatch alert that name is taken
        //         history.push('/Location/' + response.data.location_id);
        //     })
        //     .catch(function (response) {
        //         console.log("Error on location db response", response);
        //     });
    }
}