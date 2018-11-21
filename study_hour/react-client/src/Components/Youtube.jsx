import React from 'react';
import YouTube from 'react-youtube';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Stop from '@material-ui/icons/Stop';





class BackgroundMusic extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef()
        this.handleClick = this.handleClick.bind(this)
        this.state = {playing: true}
    }

    handleClick() {
        if (this.state.playing) {
            this.myRef.current.internalPlayer.pauseVideo();
            this.setState({playing: false})
        } else {
            this.myRef.current.internalPlayer.playVideo();
            this.setState({playing: true})
        }

    }
    render() {
        const { classes } = this.props;
        const opts = {
            height: '0',
            width: '0',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            },
            // host: 'http://www.youtube.com',
        };

        if (!this.state.playing)
            var button = <PlayArrow/>;
        else
            var button = <Stop/>;

        return (
            <div>
            <YouTube
                ref={this.myRef}
                videoId="hHW1oY26kxQ"
                opts={opts}
                onReady={this._onReady}
            />
                <Button variant="fab" color="primary" aria-label="Add" onClick={this.handleClick}>
                    {button}
                </Button>
            </div>
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        // event.target.pauseVideo();
    }
}

export default BackgroundMusic;