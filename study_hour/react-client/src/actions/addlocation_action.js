import axios from "axios";
import history from "../history";


export function addlocation(name, address, outlet, internet, open_time, close_time,noise_level, upload_ref) {
    open_time = "1999-01-08 04:05:06";
    close_time = "1999-01-08 04:05:06";
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
                console.log("addlocation response", response.data);
                if (response.data.success === false) return; // dispatch alert that name is taken
                upload_ref.current.fileUpload(response.data.location_id);
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}