import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { Dashboard } from './components/Dashboard';
import { requireAuth } from './components/requireAuth';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
      </Switch>
    </div>
  );
};

export default App;
