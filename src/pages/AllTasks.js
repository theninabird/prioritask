import React, { useState } from 'react';
import { nanoid } from "nanoid";
import List from '@material-ui/core/List';
import NavBar from '../components/NavBar';
import CornerFab from '../components/CornerFab';
import Task from '../components/Task';

export default function AllTasks(props) {
    const [tasks, setTasks] = useState(props.tasks);

    const toggleTaskCompleted = id => {
        const updatedTasks = tasks.map(task => {
            if (id === task.id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
        console.log(updatedTasks);
    };

    const taskList = tasks.map(task => (
        <Task
          id={task.id}
          title={task.title}
          completed={task.completed}
          dueDate={task.dueDate}
          key={task.id}
          toggleTaskCompleted={toggleTaskCompleted}
        />
      )
    );

    const addTask = (newTitle, newDueDate) => {
        const newTask = { id: "task-" + nanoid(), title: newTitle, completed: false, dueDate: newDueDate};
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="container">
            <NavBar title="All Tasks" />
            <CornerFab addTask={addTask} />
            <List>
                {taskList}  
            </List>
        </div>
    )
}