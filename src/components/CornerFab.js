import React, { useState } from 'react';
import './CornerFab.css';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';

const CornerFab = (props) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = (e) => {
        setOpen(false);
        e.preventDefault();
        props.addTask(title, dueDate);
        setTitle("");
        setDueDate("");
    };

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleDueDate = (e, newDueDate) => {
        setDueDate(newDueDate);
    }

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
                    value={title}
                    onChange={handleChangeTitle}
                />
                <Chip label="Add tag" onClick={handleClick} />
                <DialogContentText>DUE DATE</DialogContentText>

                <ToggleButtonGroup value={dueDate} onChange={handleDueDate} exclusive aria-label="text dueDate">
                    <ToggleButton value='Today'>Today</ToggleButton>
                    <ToggleButton value='Tomorrow'>Tomorrow</ToggleButton>
                    <ToggleButton value='Custom'>Custom</ToggleButton>
                </ToggleButtonGroup>
                
                <DialogContentText>REMINDERS</DialogContentText>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button>Add date</Button>
                    <Button>Add time</Button>
                    <Button>Repeat?</Button>
                </ButtonGroup>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default CornerFab;