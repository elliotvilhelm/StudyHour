import React from 'react'
import axios from 'axios';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { Button } from "@material-ui/core"
import history from "../history";
import Paper from "@material-ui/core/Paper/Paper";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ file: null, files: []};
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onChange(e) {
        console.log(e.target.files);
        this.setState({file: e.target.files[0]})
        this.setState({files: e.target.files});
        if (this.state.files.length > 0) {
            if (this.props.fileLoaded)
                this.props.fileLoaded(true);
        }
        else {
            if (this.props.fileLoaded)
                this.props.fileLoaded(false);
        }
        }

    fileUpload(location_id){
        for (let i = 0; i < this.state.files.length; i++) {
            let file = this.state.files[i];
            let key;
            const formData = new FormData();
            formData.append('file', file);
            axios({
                method: 'post',
                url: '/api/image-upload',
                data: formData,
                config: {headers: {'content-type': 'multipart/form-data'}},
            }).then(response => {
                key = response.data.s3_code;

                axios({
                    method: 'post',
                    url: `/api/addlocationimage/user`,
                    data: {location_id: location_id, user_id: localStorage.getItem('user_id'), s3code: key},
                    config: {headers: {'Content-Type': 'multipart/form-data'}}
                }).then(response => {
                    history.push('/Location/' + location_id);
                }).catch(function (response) {
                    console.log("Error", response);
                });

            }).catch(function (response) {
                console.log("Error", response);
            });
        }
    }

    fileUploadProfile(user_id) {
        let file = this.state.file;
        let key;
        const formData = new FormData();
        formData.append('file', file);
        return axios({
            method: 'post',
            url: '/api/image-upload',
            data: formData,
            config: { headers: {'content-type': 'multipart/form-data' }},
        }).then(response => {
            key = response.data.s3_code;

            axios({
                method: 'post',
                url: `/api/upload/profile_image`,
                data: {user_id: user_id, s3code: key},
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
        });
    }


    render() {
        let file_names;
        let images_button;
        if (this.state.files.length > 0)
            file_names = [<Typography variant='subheading' style={{color: "white"}}>Selected Files</Typography>];
        else
            file_names = [];
        for (let i = 0; i < this.state.files.length; i++) {
            file_names.push(<Typography variant='subheading' style={{color: "white"}}>{this.state.files[i].name}</Typography>)
        }

        if (this.props.multi) {
            images_button = (
                <Paper style={{width: '40%', textAlign: 'center', display: 'inline-block'}}>
                    <Button component="span">Select Images to Upload</Button>
                </Paper>
            );
        }
        else {
            images_button = (
                <Paper style={{width: '100%', textAlign: 'center', display: 'inline-block'}}>
                    <Button component="span">Select Image to Upload</Button>
                </Paper>);
        }
        return (
            <Grid style={{margin:0}} >
                <form encType="multipart/form-data">
                    <input hidden id="raised-button-file" accept="image/*" type="file" name="recfile" onChange={this.onChange} multiple/>
                    <label htmlFor="raised-button-file">
                            {images_button}
                    </label>
                    <Typography variant='subheading' style={{color: "white"}}>
                        {file_names}
                    </Typography>
                </form>
            </Grid>
        )
    }
}

export default FileUpload;
