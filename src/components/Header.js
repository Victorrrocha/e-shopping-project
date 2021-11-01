import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchBar from './SearchBar';
import Grid from '@mui/material/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

import { useHistory } from 'react-router';

const Header = () => {
    const dispatch = useDispatch()

    const loggedInStatus = useSelector(state => state.auth.isLoggedIn)
    const history = useHistory()

    const loginHandle = () => {
        history.push('/auth')
    }

    const logoutHandle = () => {
        dispatch(authActions.logout())
    }   

    const homeHandle = () => {
        history.push('/')
    }

    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Grid container alignItems="center">                        
                                <Typography 
                                    onClick={homeHandle}
                                    ariant="h2" 
                                    component="div"
                                    sx={{ 
                                        flexGrow: 1,
                                        fontSize: 20,
                                        cursor: 'pointer'
                                    }}>
                                    Amaclone
                                </Typography>
                            </Grid>
                        </Grid>

                        {/* <Grid item xs={8} md={6}>
                            <SearchBar />
                        </Grid> */}

                        <Grid item>
                            {!loggedInStatus && <Button 
                                color="inherit"
                                onClick={loginHandle}>Login</Button>}
                            {loggedInStatus && <Button 
                                color="inherit"
                                onClick={logoutHandle}>Logout</Button>}
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
