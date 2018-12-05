import React, {Component} from 'react';
import '../styles/animeStyle.css';
import anime from 'animejs';


anime({
    targets: '.welcome',
    scale: 2,
    easing: 'linear',
    duration: 4000,
    loop: true,
    direction: 'alternate'
});

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