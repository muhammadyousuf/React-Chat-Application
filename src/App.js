import React, { } from 'react';

import Signup from './Components/Signuup';
import Login from './Components/Login';
import Chat from './Components/Chat';
import {BrowserRouter as Router , Route} from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <Router>
      <div>
       
       <Route exact path='/' component={Signup} />
       <Route path='/Login' component={Login} />
       <Route path='/Chat' component={Chat} />
       
      </div>
      </Router>
    );
  }
}

export default App;
