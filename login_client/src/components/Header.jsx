import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import {Link} from 'react-router-dom';
const Header = () => {
    const [value, setValue] = useState();
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3">MERN AUTH</Typography>
                    <Box sx={{ marginLeft: 'auto' }} >
                        <Tabs onChange={(e, val) => setValue(val)} value={value} textColor="inherit">
                            <Link to={'/signup'}>
                                <Tab label="Signup"></Tab>
                            </Link>
                            <Link to={'/login'}>
                                <Tab label="Login"></Tab>
                            </Link>
                        </Tabs>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Header;