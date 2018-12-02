import React from 'react'
import axios from 'axios';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import { Button } from "@material-ui/core"
import history from "../history";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={ file: null };
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(location_id){
        let file = this.state.file;
        let key;
        const formData = new FormData();
        formData.append('file', file);
        axios({
            method: 'post',
            url: '/api/image-upload',
            data: formData,
            config: { headers: {'content-type': 'multipart/form-data' }},
        }).then(response => {
            key = response.data.s3_code;

            axios({
                method: 'post',
                url: `/api/addlocationimage/user`,
                data: {location_id: location_id, user_id: localStorage.getItem('user_id'), s3code: key},
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(response => {
                history.push('/Location/' + location_id);
            }).catch(function (response) {
                console.log("Error",response);
            });


        }).catch(function (response) {
            console.log("Error",response);
        });


    }


    render() {
        return (
            <Grid style={{margin:0}} >
                <form encType="multipart/form-data">
                    <Typography variant='subheading' style={{color: "white"}}>Select File</Typography>
                    <input hidden id="raised-button-file" accept="image/*" type="file" name="recfile" onChange={this.onChange} />
                    <label htmlFor="raised-button-file">
                        <Button component="span">
                            Select Files
                        </Button>
                    </label>
                    <Button type="submit">Upload</Button>
                </form>
            </Grid>
        )
    }
}

export default FileUpload;
