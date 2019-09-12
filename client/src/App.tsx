import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
        <Route path='/' render={r => <Home />}></Route>
      </Switch>
    </div>
  );
}

export default App;
