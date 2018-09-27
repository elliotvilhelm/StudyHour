import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import home from '../images/home.svg'
import profile from '../images/profile.svg'
import '../styles/style.css'
import Img from 'react-image';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'

const style = {
    display: 'inline-block',
    margin: '40px 32px 16px 0',
};

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true};
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(op)  {
        // this.setState({ open: op });
    }
    render() {
        return (
            <div>
            <Drawer open={this.state.open}
                    containerClassName='left-drawer'
                    zDepth={2}>
                <MenuItem className='menu-item'>
                    <Link to={"Home"}>
                        <img src={home} className='img-right'/>
                    </Link>
                </MenuItem>
                <MenuItem className='menu-item'>
                    <Link to={"About"}>
                        <Img src={profile} className="img-right"/>
                    </Link>
                </MenuItem>
            </Drawer>
            </div>
        );
    }
}

export default SideBar;