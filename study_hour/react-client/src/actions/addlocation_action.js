import axios from "axios";
import history from "../history";


export function addlocation(name, address, outlet, internet, open_time, close_time,noise_level) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/AddLocation',
            data: {
                name: name,
                address: address,
                outlet: outlet,
                internet: internet,
                open_time: open_time,
                close_time: close_time,
                noise_level: noise_level
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