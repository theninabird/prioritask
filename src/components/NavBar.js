import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import logo from './prioriTaskLogo.png';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

const NavBar = (props) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" onClick={toggleDrawer('left', true)} className="menuButton" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="title">
                    {props.title}
                </Typography>
                <IconButton aria-label="search" color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton aria-label="display more actions" edge="end" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    <MoreIcon />
                </IconButton>
                </Toolbar>
            </AppBar>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Sort</MenuItem>
                <MenuItem onClick={handleClose}>Select tasks</MenuItem>
                <MenuItem>
                    <Checkbox
                        edge="start"
                        disableRipple
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    Hide completed tasks
                </MenuItem>
            </Menu>

            <React.Fragment key='left'>
                <SwipeableDrawer
                    anchor='left'
                    open={state['left']}
                    onClose={toggleDrawer('left', false)}
                    onOpen={toggleDrawer('left', true)}
                >
                    <div
                        className="list"
                        role="presentation"
                        onClick={toggleDrawer('left', false)}
                        onKeyDown={toggleDrawer('left', false)}
                    >
                        <div class="drawer-header">
                            <img id="logo" src={logo} alt="background" />
                        </div>
                        <List>
                            <Link className="list-link" to="/">
                                <ListItem button key='All Tasks'>
                                    <ListItemIcon> <MailIcon /> </ListItemIcon>
                                    <ListItemText primary='All Tasks' />
                                </ListItem>
                            </Link>
            
                            <Link className="list-link" to="/today">
                                <ListItem button key='Today'>
                                    <ListItemIcon> <MailIcon /> </ListItemIcon>
                                    <ListItemText primary='Today' />
                                </ListItem>
                            </Link>

                            <ListItem button key='Upcoming'>
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary='Upcoming' />
                            </ListItem>
                            <ListItem button key='Tags'>
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary='Tags' />
                            </ListItem>
                            </List>
                            <Divider></Divider>
                            <List>
                            <ListItem button key='Settings'>
                                <ListItemIcon> <MailIcon /> </ListItemIcon>
                                <ListItemText primary='Settings' />
                            </ListItem>
                        </List>
                    </div>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    )
}
export default NavBar;