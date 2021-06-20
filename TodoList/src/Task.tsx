import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "./AppWithRedux";
import EditableSpan from "./EdiatableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TasksPropsType = {
    task: TaskType
    todoListID: string
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}

const Task = React.memo(({task, todoListID, changeTaskStatus, removeTask, changeTaskTitle}: TasksPropsType) => {
    //  const {task,todoListID,changeTaskStatus,removeTask,changeTaskTitle} = props - деструктуризация в (парметрах аналогичная запись)
    const onTitleChangeHandler = useCallback((title: string) => changeTaskTitle(todoListID, title, task.id), [task.id, changeTaskTitle, todoListID])
    const onStatusChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todoListID)
    }, [task.id, changeTaskStatus, todoListID])
    const onClickHandler = useCallback(() => {
        removeTask(task.id, todoListID)
    }, [task.id, removeTask, todoListID])
    return (
        <li>
                <span className={task.isDone ? 'is-done' : ''}>
                    <Checkbox
                        onChange={onStatusChangeHandler}
                        checked={task.isDone}
                        color={'primary'}
                    />
                     <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
                </span>
            <IconButton onClick={onClickHandler} color={'secondary'}>
                <Delete/>
            </IconButton>
        </li>
    )
})
export default Task;

