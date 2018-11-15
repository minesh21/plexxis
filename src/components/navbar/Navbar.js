import React from 'react';
import { AppBar, Toolbar, Typography,} from '@material-ui/core';
import './Navbar.css';

class Navbar extends React.Component {
    render() {
        return (

                <AppBar position="relative" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Plexxis Employee Manager
                        </Typography>
                        <div className="spacer" />

                    </Toolbar>
                </AppBar>
        )
    }
}

export default Navbar;