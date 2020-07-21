import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import AllTasks from './pages/AllTasks';
import Today from './pages/Today';

export default function App() {

  return (
    <Switch className="switch">
      <Route exact path="/"component={AllTasks} />
      <Route path="/today" component={Today} />
    </Switch>
  )
}
