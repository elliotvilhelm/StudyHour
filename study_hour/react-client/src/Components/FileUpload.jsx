import React from 'react'
import axios from 'axios';

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
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios({
            method: 'post',
            url: `/api/image-upload`,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        }).then(response => {
            console.log("response upload", response);

        })
            .catch(function (response) {
                console.log("Error",response);
            });
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default FileUpload;
