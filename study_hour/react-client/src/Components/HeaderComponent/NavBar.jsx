import React, { Component, Fragment } from 'react';
import login from '../../images/login.svg';
import studyhour from '../../images/studyhour.png';
import signup from '../../images/signup.svg';
import home from '../../images/home.svg';
import logout from '../../images/logout.svg';
import profile from '../../images/profile.svg';
import { IconButton, AppBar, Toolbar, Button, Drawer, List, ListItemText, ListItem } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as auth_actions from "../../actions/auth";
import '../../styles/style.css';
import BackgroundMusic from '../Youtube'


const DrawerWidth = 250;
const list = (
    <List>
        <ListItem button key="Favourite Locations">
            <ListItemText primary={"Favorite Places"} />
        </ListItem>
        <ListItem button key="Favourite Locations">
            <ListItemText primary={"Nearby StudyHours"} />
        </ListItem>
        <ListItem button>
            <ListItemText primary={"Map"} />
        </ListItem>
    </List>
)
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
                           <BackgroundMusic/>
                            <a href={'./Home'} style={{marginRight: "70%"}}><img src={studyhour}  width={100} /></a>
                            <Button color="inherit">
                                <Link to={"/"}>
                                    <img src={home} width={20} />
                                </Link>
                            </Button>
                         
                            <Link to={`/Home/ProfilePage/${localStorage.getItem('user_id')}`}>
                                <Button color="inherit">
                                    <img src={profile} width={20} />
                                </Button>
                            </Link>
                            <Link to={"/Login"} >
                                <Button color="inherit" onClick={() => this.props.dispatch(auth_actions.unauthenticate())}>
                                    <img src={logout} width={20} />
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
                            <img src={studyhour} style={{ marginRight: "75%" }} width={100} />
                            <BackgroundMusic/>
                            <Link to={"/Login"}>
                                <Button color="inherit">
                                    <img src={login} width={20} />
                                </Button>
                            </Link>
                            <Link to={"/Signup"}>
                                <Button>
                                    <img src={signup} width={20} />
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
