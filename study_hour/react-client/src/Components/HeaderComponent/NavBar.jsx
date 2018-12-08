import React, { Component, Fragment } from 'react';
import login from '../../images/login.svg';
import studyhour from '../../images/studyhour.png';
import signup from '../../images/signup.svg';
import home from '../../images/home.svg';
import logout from '../../images/logout.svg';
import profile from '../../images/profile.svg';
import { IconButton, AppBar, Toolbar, Button, Drawer, List, ListItemText, ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as auth_actions from "../../actions/auth";
import '../../styles/style.css';
import BackgroundMusic from '../Youtube'


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: false, comeout: false };
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    toggleDrawer(flag) {
        return () => {

            this.setState({ authenticated: this.state.authenticated, comeout: flag })
            console.log(this.state.comeout);
        };
    }
    render() {
        let navBar;
        if (this.props.authenticated) {
            navBar = (
                <Fragment>
                    <AppBar position="static">
                        <Toolbar>
                            <a href={'./Home'} style={{marginRight: "70%"}}><img src={studyhour}  width={100} /></a>
                            <Button color="inherit" size="medium">
                                <Link to={"/"}>
                                    <img src={home} width={30} height={40}/>
                                </Link>
                            </Button>
                         
                            <Link to={`/Home/ProfilePage/${localStorage.getItem('user_id')}`}>
                                <Button color="inherit" size="medium">
                                    <img src={profile} width={30} height={40}/>
                                </Button>
                            </Link>
                            <Link to={"/Login"} >
                                <Button color="inherit" size="medium" onClick={() => this.props.dispatch(auth_actions.unauthenticate())}>
                                    <img src={logout} width={30} height={40}/>
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Fragment>

            );
        } else {
            navBar = (
                <Fragment>
                    <AppBar position="static" >
                        <Toolbar>
                            <a href={'./Home'} style={{marginRight: "70%"}}><img src={studyhour}  width={100} /></a>
                            <Link to={"/Login"}>
                                <Button color="inherit" size="medium">
                                    <img src={login} width={30} height={40}/>
                                </Button>
                            </Link>
                            <Link to={"/Signup"}>
                                <Button color="inherit" size="medium">
                                    <img src={signup} width={30} height={40}/>
                                </Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </Fragment>
            );
        }
        return navBar;
    }


}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    };
}


export default connect(mapStateToProps)(NavBar);
