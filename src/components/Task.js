import React, { useState, useEffect } from 'react';
import TaskDataService from "../services/TaskService";
import './Task.css';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
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
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Task(props) {
    // Task properties
    const initialTaskState = {
        _id: null,
        title: "",
        dueDate: "",
        subTasks: [],
        description: "",
        completed: false
    };
    const [task, setTask] = useState(initialTaskState);

    const checkedState = false;
    const [checked, setChecked] = useState(checkedState);

    const getTask = id => {
        TaskDataService.get(id)
            .then(res => {
                setTask(res.data);
                setChecked(res.data.completed);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTask(props.id);
    }, [props.id]);

    const handleToggle = (e) => {
        setChecked(e.target.checked);
        console.log(checked);
        updateCompleted(checked);
    };

    // Popup states
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    // View Task
    const viewTask = () => {
        setViewOpen(true);
    }

    const handleViewClose = () => {
        setViewOpen(false);
    };

    // Calculate Due Date labels
    const DueDateChip = () => {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        today = today.toDateString();
        tomorrow = tomorrow.toDateString();

        var dueDate = new Date(String(task.dueDate));
        dueDate = dueDate.toDateString();

        if(task.dueDate === undefined || task.dueDate === null) {
            return <div></div>;
        } else if (dueDate === today) {
            return <Chip label="Today" variant="outlined" />;
        } else if (dueDate === tomorrow) {
            return <Chip label="Tomorrow" variant="outlined" />;
        } else {
            return <Chip label={dueDate} variant="outlined" />;
        }
    }

    const DueDate = () => {
        var dueDate = new Date(String(task.dueDate));
        dueDate = dueDate.toDateString();

        if(task.dueDate === undefined || task.dueDate === null) {
            return <div></div>;
        } else {
            return (
                <div>
                    <DialogContentText>DUE DATE</DialogContentText>
                    <p>{dueDate}</p>
                </div>
            );
        }
    }

    const SubTasks = () => {
        if(task.subTasks === undefined || task.subTasks.length === 0) {
            return <div></div>;
        } else {
            return (
                <div>
                    <DialogContentText>SUBTASKS</DialogContentText>
                </div>
            );
        }
    }

    const Description = () => {
        if(task.description === undefined || task.description.length === 0) {
            return <div></div>;
        } else {
            return (
                <div>
                    <DialogContentText>DESCRIPTION</DialogContentText>
                    <p>{task.description}</p>
                </div>
            );
        }
    }

    // Menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditOpen(true);
        handleMenuClose();
        handleViewClose();
    }
    
    const handleDelete = () => {
        TaskDataService.remove(task._id)
            .then(res => {
                console.log(res.data);
                props.refreshTasks();
            })
            .catch(e => {
                console.log(e);
            });
        handleMenuClose();
        handleViewClose();
    };

    // Edit Task
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    }

    const handleToggleButtons = (event, value) => {
        setTask({ ...task, dueDate: value });
    }

    const addSubtask = () => {
        console.log("Add subtask here");
    };

    const updateCompleted = status => {
        var data = {
            _id: task._id,
            title: task.title,
            dueDate: task.dueDate,
            subTasks: task.subTasks,
            description: task.description,
            completed: status
        };
        console.log(data);
        TaskDataService.update(task._id, data)
            .then(res => {
                setTask({ ...task, completed: status });
                console.log(task);
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateTask = () => {
        TaskDataService.update(task._id, task)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
        handleEditClose();
        viewTask();
    };

    const handleEditClose = () => {
        setEditOpen(false);
    }

    return (
        <div>
            {/* Task item */}
            <ListItem key={props.id} role={undefined} dense button>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        disableRipple
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </ListItemIcon>
                <div className="task-click-space" onClick={viewTask}>
                     <ListItemText id={task._id} primary={task.title} />
                </div>
                <DueDateChip />
            </ListItem>

            {/* VIEW TASK */}
            <Dialog open={viewOpen} onClose={handleViewClose} aria-labelledby="form-dialog-title">
                <div className="inline">
                    <DialogTitle id="form-dialog-title">
                        View Task
                        <IconButton className="task-menu-button" aria-label="display more actions" color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
                            <MoreIcon />
                        </IconButton>
                    </DialogTitle>
                </div>
                
                <DialogContent>
                    <h1>{task.title}</h1>
                    {/* Tags */}
                    <DueDate />
                    <SubTasks />
                    <Description />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleViewClose} color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>

            <Menu
                style={{zIndex: 1400}}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>

            {/* EDIT TASK */}
            <Dialog open={editOpen} onClose={handleEditClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title of task"
                        type="title"
                        fullWidth
                        value={task.title}
                        variant="outlined"
                        name="title"
                        onChange={handleInputChange}
                    />
                    <Chip label="Add tag" />
                    <DialogContentText>DUE DATE</DialogContentText>
                    <ToggleButtonGroup name="dueDate" value={task.dueDate} onChange={handleToggleButtons} exclusive aria-label="text dueDate">
                        <ToggleButton value={today}>Today</ToggleButton>
                        <ToggleButton value={tomorrow}>Tomorrow</ToggleButton>
                        <ToggleButton value='Custom'>Custom</ToggleButton>
                    </ToggleButtonGroup>
                    <DialogContentText>SUBTASKS</DialogContentText>
                    <Button onClick={addSubtask} color="primary">
                        Add Subtask
                    </Button>
                    <TextField
                        margin="dense"
                        id="description"
                        type="description"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        name="description"
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={updateTask} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}