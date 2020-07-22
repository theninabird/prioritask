import React, { useState, useEffect } from 'react';
import TaskDataService from '../services/TaskService';

import List from '@material-ui/core/List';
import NavBar from '../components/NavBar';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

export default function AllTasks(props) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        retrieveTasks();
    }, []);

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

    // const toggleTaskCompleted = id => {
    //     const updatedTasks = tasks.map(task => {
    //         if (id === task.id) {
    //             return {...task, completed: !task.completed}
    //         }
    //         return task;
    //     });
    //     setTasks(updatedTasks);
    //     console.log(updatedTasks);
    // };

    const taskList = tasks.map(task => (
        <Task
          id={task._id}
          refreshTasks={refreshTasks}
        />
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