import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
// import IconButton from '@material-ui/core/IconButton';

export default function Task(props) {
    const checkedState = props.completed;
    const [checked, setChecked] = React.useState(checkedState);
    const [open, setOpen] = React.useState(false);

    const handleToggle = (e) => {
        setChecked(e.target.checked);
        props.toggleTaskCompleted(props.id);
    };

    const viewTask = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        console.log('Save changes');
    };

    let today = new Date();
    let todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let tomorrowDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    let dueDateChip;
    console.log(props.dueDate);
    if(props.dueDate === undefined || props.dueDate.length === 0) {
        dueDateChip = <div></div>;
    } else if (props.dueDate === todayDate) {
        dueDateChip = <Chip label="Today" variant="outlined" />;
    } else if (props.dueDate === tomorrowDate) {
        dueDateChip = <Chip label="Tomorrow" variant="outlined" />;
    } else {
        dueDateChip = <Chip label={props.dueDate} variant="outlined" />;
    }

  return (
        <div>
            <ListItem key={props.id} role={undefined} dense button onClick={viewTask}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        disableRipple
                        onChange={handleToggle}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </ListItemIcon>
                <ListItemText id={props.id} primary={props.title} />

                {dueDateChip}

                <ListItemSecondaryAction>
                    
                </ListItemSecondaryAction>
            </ListItem>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">View Task</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="title"
                        label="Title of task"
                        type="title"
                        fullWidth
                        value={props.title}
                        variant="outlined"
                    />
                    <Chip label="Add tag" />
                    <DialogContentText>DUE DATE</DialogContentText>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button>Today</Button>
                        <Button>Tomorrow</Button>
                        <Button>Custom</Button>
                    </ButtonGroup>
                    <DialogContentText>REMINDERS</DialogContentText>
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button>Add date</Button>
                        <Button>Add time</Button>
                        <Button>Repeat?</Button>
                    </ButtonGroup>
                    <DialogContentText>SUBTASKS</DialogContentText>
                    <TextField
                        margin="dense"
                        id="description"
                        type="description"
                        label="Description"
                        fullWidth
                        variant="outlined"
                    />
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
    );
}