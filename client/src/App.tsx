import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'

import Home from './screens/Home/Home';
import Best from './screens/Home/Best';
import CreateTeam from './screens/Team/CreateTeam';
import DetailTeam from './screens/Team/DetailTeam';
import UpdateTeam from './screens/Team/UpdateTeam';

import Login from './auth/Login';

// import UserInfoContext from './context/UserInfoContext';
// https://smujihoon.tistory.com/214

function App() {
  return (
      <React.Fragment>
        <Container maxWidth="lg" style={{ padding: '0px' }}>
          <Router>
            <Login />
            <Header />
            <br/>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/createTeam' exact component={CreateTeam} />
              <Route path='/team/:id' exact component={DetailTeam} />
              <Route path='/updateTeam/:id' exact component={UpdateTeam} />
              <Route path='/best' exact component={Best} />
            </Switch>
          </Router>
          <Footer />
        </Container>
      </React.Fragment>
  );
}

export default App;