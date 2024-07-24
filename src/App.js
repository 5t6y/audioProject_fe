import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './views/PrivateRoute';
import Login from './views/Login';
import Signup from './views/Signup';
import Logout from './views/Logout';
import Home from './views/Home';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
