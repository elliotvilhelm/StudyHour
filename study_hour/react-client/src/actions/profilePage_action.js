import history from "../history";
import axios from "axios";


export function listFavorite(id) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/Profile/favorites',
            data: {id: id},
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push({
                    pathname: '/Locations',
                    state: {
                        list: response.data.dbresponse,
                        favorite: true
                    }
                })
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}

export function editProfile() {
    return (dispatch) => {
        history.push('/EditProfile');
    }
}

export function submitProfile(id, fullname, password, city, bio) {
    return (dispatch) => {
        axios({
            method: 'post',
            url: '/api/Profile/submitProfile',
            data: {
                id: id,
                fullname: fullname,
                password: password,
                city: city,
                bio: bio
            },
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(function (response) {
                if (response.data.success === false) return; // dispatch alert that name is taken
                history.push(`/Home/ProfilePage/${id}`);
            })
            .catch(function (response) {
                console.log("Error on location db response", response);
            });
    }
}
