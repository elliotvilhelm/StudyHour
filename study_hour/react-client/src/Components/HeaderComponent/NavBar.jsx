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
                            <IconButton  onClick={this.toggleDrawer(true)} style={{ marginRight: "1%" }} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <img src={studyhour} style={{ marginRight: "70%" }} width={100} />
                            <BackgroundMusic/>
                            <Button color="inherit">
                                <Link to={"/Home"}>
                                    <img src={home} width={20} />
                                </Link>
                            </Button>
                             <Button color="inherit">
                                <Link to={"/Home"}>
                                    <img src={profile} width={20} />
                                </Link>
                            </Button>
                            <Button color="inherit" onClick={() => this.props.dispatch(auth_actions.unauthenticate())}>
                                <Link to={"/Login"} >
                                    <img src={logout} width={20} />
                                </Link>
                            </Button>

                        </Toolbar>
                    </AppBar>
                    <Drawer width={DrawerWidth} open={this.state.comeout} onClose={this.toggleDrawer(false)}>


                        {list}
                    </Drawer>
                </Fragment>

            );
        } else {
            navBar = (
                <Fragment>
                    <AppBar position="static" >
                        <Toolbar>
                            <IconButton onClick={this.toggleDrawer(true)} style={{ marginRight: "1%" }} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <img src={studyhour} style={{ marginRight: "75%" }} width={100} />


                            <Button color="inherit">
                                <Link to={"/Login"}>
                                    <img src={login} width={20} />
                                </Link>
                            </Button>

                            <Button>
                                <Link to={"/Signup"}>
                                    <img src={signup} width={20} />
                                </Link>
                            </Button>

                        </Toolbar>
                    </AppBar>

                    <Drawer width={DrawerWidth} open={this.state.comeout} onClose={this.toggleDrawer(false)}>


                        {list}
                    </Drawer>

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
