import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import AllTasks from './pages/AllTasks';
import Today from './pages/Today';

export default function App() {
  const DATA = [
    { id: "todo-0", title: "Eat", completed: true, dueDate: "" },
    { id: "todo-1", title: "Sleep", completed: false, dueDate: "" },
    { id: "todo-2", title: "Repeat", completed: false, dueDate: "2020-7-9" }
  ];

  return (
    <Switch className="switch">
      <Route exact path="/" render={(props) => (
        <AllTasks {...props} tasks={DATA} />
      )} />
      <Route path="/today" component={Today} />
    </Switch>
  )
}
