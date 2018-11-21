import React from 'react'
import axios from 'axios';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault();  // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response);
        })
    }
    onChange(e) {
        this.setState({file: e.target.files[0]})
    }
    fileUpload(file){
        const formData = new FormData();
        formData.append('file', file);
        console.log("fd", formData)
        console.log("************  file", formData.get("file"))
        return axios({
            method: 'post',
            url: `/api/image-upload`,
            data: formData,
            config: { headers: {'content-type': 'multipart/form-data' }},
        }).then(response => {
            console.log("response upload", response);

        }).catch(function (response) {
            console.log("Error",response);
        });
        // return axios.post('/api/image-upload', formData, )
    }

    render() {
        return (
            <Grid style={{margin:0}} onSubmit={this.onFormSubmit}>
                <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
                <Typography variant='subheading' style={{color: "white"}}>Upload Image</Typography>
                <input type="file" name="recfile" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form>
            </Grid>
        )
    }
}

export default FileUpload;
//             <form onSubmit={this.onFormSubmit} encType="multipart/form-data">
//                 <h1>File Upload</h1>
//                 <input type="file" name="recfile" onChange={this.onChange} />
