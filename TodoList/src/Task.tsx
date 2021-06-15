import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./AppWithRedux";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EdiatableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TasksPropsType = {
    task: TaskType
    todolistId: string
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}

const Task = React.memo((props: TasksPropsType) => {
    const changeTaskTitle = (title: string) => props.changeTaskTitle(props.todolistId, title, props.task.id)
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todolistId, e.currentTarget.checked, props.task.id)
        const removeTask = () => {
            props.removeTask(props.task.id, props.todolistId)
        }
    }

    return (
        <li>

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
