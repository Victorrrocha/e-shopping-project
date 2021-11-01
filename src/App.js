import { StyledEngineProvider } from '@mui/styled-engine';
import { createTheme, ThemeProvider } from '@mui/material';

import Authentication from './pages/Authentication';
import Profile from './pages/Profile';
import Home from './pages/Home';

import Header from './components/Header';

import { Route, Switch } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import Layout from './layout/Layout';

const theme = createTheme({
  
})

function App() {

  const storedToken = localStorage.getItem('token')
  const dispatch = useDispatch()

  useEffect(() => {
    if(storedToken){
      dispatch(authActions.login({token: storedToken}))
    }
  }, [dispatch, storedToken])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Header />
        <Layout>
          <Switch>
            <Route path="/auth">
              <Authentication />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          </Layout>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
