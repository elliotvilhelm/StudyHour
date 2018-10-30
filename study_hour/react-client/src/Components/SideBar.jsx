import React, {Component} from 'react';
import { URLProvider } from 'react-url';
import home from '../images/home.svg'
import profile from '../images/profile.svg'
import login from '../images/login.svg'
import logout from '../images/logout.svg'
import signup from '../images/signup.svg'
import '../styles/style.css'
import Img from 'react-image';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom'
import { connect } from  "react-redux";
import * as auth_actions from "../actions/auth";

const style = {
    display: 'inline-block',
    margin: '40px 32px 16px 0',
};

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true, authenticated: false};
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(op)  {
        // this.setState({ open: op });
    }
    render() {
        let sideBar;
        if (this.props.authenticated) {
            sideBar = (<Drawer open={this.state.open}
                               containerClassName='left-drawer'
                               zDepth={2}>
                <MenuItem className='menu-item'>
                    <Link to={"Home"}>
                        <img src={home} className='img-right'/>
                    </Link>
                </MenuItem>
                <MenuItem className='menu-item'>
                    <Link to={"About"}>
                        <img src={profile} className="img-right"/>
                    </Link>
                </MenuItem>
                <MenuItem className='menu-item' onClick={() => this.props.dispatch(auth_actions.unauthenticate())}>
                    <Link to={"Login"} >
                        <img src={logout} className="img-right" />
                    </Link>
                </MenuItem>
            </Drawer>);
        } else {
            sideBar = (<Drawer open={this.state.open}
                               containerClassName='left-drawer'
                               zDepth={2}>
                <MenuItem className='menu-item'>
                    <Link to={"Login"}>
                        <img src={login} className='img-right'/>
                    </Link>
                </MenuItem>
                <MenuItem className='menu-item'>
                    <Link to={"Signup"}>
                        <img src={signup} className='img-right'/>
                    </Link>
                </MenuItem>
            </Drawer>);

        }

        return (
            <div>
                {sideBar}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(SideBar);