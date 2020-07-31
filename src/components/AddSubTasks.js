import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SubTaskDataService from "../services/SubTaskService";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    headings: {
        marginTop: '10px',
        marginBottom: 0,
    },
});

export default function AddSubTasks(props) {
    const classes = useStyles();

    const [subTasks, setSubTasks] = useState([]);
    const [subTaskTitle, setSubTaskTitle] = useState('');

    useEffect(() => {
        SubTaskDataService.getAll(props.taskId)
            .then(res => {
                console.log(res.data);
                setSubTasks(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [props.taskId]);

    const fetchSubTasks = () => {
        SubTaskDataService.getAll(props.taskId)
            .then(res => {
                console.log(res.data);
                setSubTasks(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleSubTaskChange = (event) => {
        setSubTaskTitle(event.target.value);
    }

    const editSubTask = (id) => {
        let subTasksArr = [...subTasks];
        let index = subTasksArr.findIndex(elem => elem._id === id);
        subTasksArr[index].title = subTaskTitle;
        let subTaskElem = subTasksArr[index];
        setSubTasks(subTasksArr);

        updateSubTask(id, subTaskElem);
    };

    const [viewDeleteMessage, setViewDeleteMessage] = useState(false);
    const [subTaskId, setSubTaskId] = useState('');

    const handleSubTaskDelete = (id) => {
      console.log(id);
        setViewDeleteMessage(true);
        setSubTaskId(id);
    }

    const handleDeleteMessageClose = () => {
        setViewDeleteMessage(false);
    }

    const deleteSubTask = () => {
        console.log(subTaskId);
        SubTaskDataService.remove(subTaskId)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateSubTask = (id, data) => {
        SubTaskDataService.update(id, data)
            .then(res => {
                console.log(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const addSubtask = () => {
        var data = {
            taskId: props.taskId,
            title: subTaskTitle,
            completed: false
        };

        SubTaskDataService.create(data)
            .then(res => {
                setSubTaskTitle('');
                console.log(res.data);
                fetchSubTasks();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const editSubTaskList = subTasks.map(subTask => (
        <ListItem key={subTask._id} role={undefined} dense button>
            <ListItemIcon>
                <Checkbox
                    color="primary"
                    edge="start"
                    checked={subTask.completed}
                    disableRipple
                    onChange={e => handleSubTaskToggle(e, subTask._id)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </ListItemIcon>
            <ListItemText id={subTask._id} primary={subTask.title} />
            <ListItemSecondaryAction>
                <IconButton  edge="end" aria-label="edit">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleSubTaskDelete(subTask._id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    ));

    const handleSubTaskToggle = (event, id) => {
        let subTasksArr = [...subTasks];
        let index = subTasksArr.findIndex(elem => elem._id === id);
        subTasksArr[index].completed = event.target.checked;
        let subTask = subTasksArr[index];
        setSubTasks(subTasksArr);

        updateSubTask(id, subTask);
    };

    return (
        <div>
            <div>
                <DialogContentText className={classes.headings}>SUBTASKS</DialogContentText>
                <List>
                    {editSubTaskList}
                </List>
                <TextField
                    margin="dense"
                    id="subtask-title"
                    label="Title of subtask"
                    type="title"
                    fullWidth
                    value={subTaskTitle}
                    variant="outlined"
                    name="title"
                    onChange={handleSubTaskChange}
                />

                <Button onClick={addSubtask} variant="contained" color="primary">
                    Add Subtask
                </Button>
            </div>

            { <Dialog fullWidth={true} open={viewDeleteMessage} onClose={handleDeleteMessageClose} aria-labelledby="subtask-delete-confirmation">
                <DialogContentText>Are you sure you want to delete?</DialogContentText>
                <DialogActions>
                    <Button onClick={deleteSubTask} color="primary">
                        Yes
                    </Button>
                    <Button onClick={handleDeleteMessageClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog> }
        </div>
    );
}
