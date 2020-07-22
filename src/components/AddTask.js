import React, { useState } from 'react';
import TaskDataService from "../services/TaskService";
import './AddTask.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';

const AddTask = (props) => {
    const formatDate = date => {
        return date.getDay() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    }
    
    // Add Task
    const initialTaskState = {
        _id: null,
        title: "",
        dueDate: "",
        subTasks: [],
        description: "",
        completed: false
    };
    const [task, setTask] = useState(initialTaskState);

    // Due Date vars
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    today = formatDate(today);
    tomorrow = formatDate(tomorrow);

    var dueDate = new Date(String(task.dueDate));
    dueDate = formatDate(dueDate);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    }

    const handleToggleButtons = (event, value) => {
        setTask({ ...task, dueDate: value });
    }

    const saveTask = () => {
        var data = {
            title: task.title,
            dueDate: task.dueDate
        };

        TaskDataService.create(data)
            .then(res => {
                setTask({
                    _id: res.data._id,
                    title: res.data.title,
                    dueDate: res.data.dueDate,
                    subTasks: res.data.subTasks,
                    description: res.data.description,
                    completed: res.data.completed
                });
                console.log(res.data);
                props.refreshTasks();
                setOpen(false);
            })
            .catch(e => {
                console.log(e);
            });
    };

    // Pop-up
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        console.log('Clicked');
    };

    return ( 
        <div>
            <div className="fab-container">
                <Fab color="secondary" aria-label="add" className="fab" onClick={handleClickOpen}>
                    <AddIcon />
                </Fab>
            </div>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Title of task"
                    type="title"
                    fullWidth
                    name="title"
                    value={task.title}
                    onChange={handleInputChange}
                />
                <Chip label="Add tag" onClick={handleClick} />
                <DialogContentText>DUE DATE</DialogContentText>
                <ToggleButtonGroup name="dueDate" value={dueDate} onChange={handleToggleButtons} exclusive aria-label="text dueDate">
                    <ToggleButton value={today}>Today</ToggleButton>
                    <ToggleButton value={tomorrow}>Tomorrow</ToggleButton>
                    <ToggleButton value='Custom'>Custom</ToggleButton>
                </ToggleButtonGroup>
                {/* <DialogContentText>REMINDERS</DialogContentText>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Add date</Button>
                    <Button>Add time</Button>
                    <Button>Repeat?</Button>
                </ButtonGroup> */}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={saveTask} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default AddTask;