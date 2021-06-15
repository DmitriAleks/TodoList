import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EdiatableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
//2/38
type TasksPropsType  = {
   task: TaskType

}

const Task = React.memo((props: TasksPropsType) => {
    return (
        <li >

                <span className={props.task.isDone ? 'is-done' : ''}>
                    <Checkbox
                        onChange={changeTaskStatus}
                        checked={props.task.isDone}
                        color={'primary'}
                    />
                     <EditableSpan title={props.task.title} changeTitle={changeTaskTitle}/>
                </span>
            <IconButton onClick={removeTask} color={'secondary'}>
                <Delete/>
            </IconButton>
        </li>
    )

})

export default Task;
