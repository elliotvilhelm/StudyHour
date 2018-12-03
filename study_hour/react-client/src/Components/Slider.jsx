import React from 'react';
import Slider from 'react-slick';

class SimpleSlider extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        var images = this.props.images.map(image =>
            <div className='location-image-div'>{image}</div>
        );
        return (
            <Slider {...settings}>
                {images}
            </Slider>
        );
    }
}

export default SimpleSlider;
