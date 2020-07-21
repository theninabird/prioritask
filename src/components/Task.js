import React, { useState } from 'react';
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
    const checkedState = props.completed;
    const [checked, setChecked] = useState(checkedState);
    const [title, setTitle] = useState(props.title);
    const [dueDate, setDueDate] = useState(props.dueDate);
    const [subTasks, setSubTasks] = useState(props.subTasks);
    const [description, setDescription] = useState(props.description);

    const handleToggle = (e) => {
        setChecked(e.target.checked);
        props.toggleTaskCompleted(props.id);
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
        let today = new Date();
        let todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let tomorrowDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
        
        if(dueDate === undefined || dueDate.length === 0) {
            return <div></div>;
        } else if (dueDate === todayDate) {
            return <Chip label="Today" variant="outlined" />;
        } else if (dueDate === tomorrowDate) {
            return <Chip label="Tomorrow" variant="outlined" />;
        } else {
            return <Chip label={dueDate} variant="outlined" />;
        }
    }

    const DueDate = () => {
        if(dueDate === undefined || dueDate.length === 0) {
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
        if(subTasks === undefined || subTasks.length === 0) {
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
        if(description === undefined || description.length === 0) {
            return <div></div>;
        } else {
            return (
                <div>
                    <DialogContentText>DESCRIPTION</DialogContentText>
                    <p>{description}</p>
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
        // Delete task 
        handleMenuClose();
        handleViewClose();
    }

    // Edit Task
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleDueDate = (e, newDueDate) => {
        setDueDate(newDueDate);
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const addSubtask = () => {
        setSubTasks("");
    };

    const handleSave = () => {
        // Save updated task
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
                     <ListItemText id={props.id} primary={props.title} />
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
                    <h1>{title}</h1>
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
                        value={title}
                        variant="outlined"
                        onChange={handleChangeTitle}
                    />
                    <Chip label="Add tag" />
                    <DialogContentText>DUE DATE</DialogContentText>
                    <ToggleButtonGroup value={dueDate} onChange={handleDueDate} exclusive aria-label="text dueDate">
                        <ToggleButton value='Today'>Today</ToggleButton>
                        <ToggleButton value='Tomorrow'>Tomorrow</ToggleButton>
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
                        onChange={handleChangeDescription}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}