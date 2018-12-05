import {Component} from "react";
import React from "react";

class StudyHour extends Component {
    constructor(props) {
        super(props);
        this.state = {url: ""}
    }

    render() {

        return (
            <div className='study_hour'>
                Study Hour
            </div>
        )
    }
}

export default StudyHour;