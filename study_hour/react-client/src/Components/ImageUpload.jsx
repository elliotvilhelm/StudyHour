import React, {Component} from 'react';
import axios from 'axios'
import { Button } from '@material-ui/core'


class ImageUpload extends Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        var bodyFormData = new FormData();
        bodyFormData.append('image', imageFile);
        axios({
            method: 'post',
            url: 'myurl',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    render() {
        return (
            <div>
                <h1>uplaod imahge</h1>
                <Button onClick={this.onClick}>CLICK THIS</Button>
            </div>
        )
    }
}
export default ImageUpload;
