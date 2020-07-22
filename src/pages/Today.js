import React, { useState, useEffect } from 'react';
import TaskDataService from '../services/TaskService';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavBar from '../components/NavBar';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

export default function Today() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        retrieveTasks();
    });

    const refreshTasks = () => {
        retrieveTasks();
    };

    const formatTodayDate = () => {
      var today = new Date();
      return today.getDay() + "-" + (today.getMonth + 1) + "-" + today.getFullYear();
    }

    const retrieveTasks = () => {
      var today = formatTodayDate();

      TaskDataService.getDueToday(today)
          .then(res => {
              setTasks(res.data);
              console.log(res.data);
          })
          .catch(e => {
              console.log(e);
          });
    };
    
    const taskList = tasks.map(task => (
        <div>
            <Task
                id={task._id}
                refreshTasks={refreshTasks}
            />
            <Divider />
        </div>
      )
    );

    return (
        <div className="container">
            <NavBar title="Today" />
            <AddTask refreshTasks={refreshTasks} />
            <List>
                {taskList}  
            </List>
        </div>
    )
}