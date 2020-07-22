import React, { useState, useEffect } from 'react';
import TaskDataService from '../services/TaskService';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavBar from '../components/NavBar';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

export default function AllTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        retrieveTasks();
    });

    const refreshTasks = () => {
        retrieveTasks();
    };

    const retrieveTasks = () => {
        TaskDataService.getAll()
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
            <NavBar title="All Tasks" />
            <AddTask refreshTasks={refreshTasks} />
            <List>
                {taskList}  
            </List>
        </div>
    )
}