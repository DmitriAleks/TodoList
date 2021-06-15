import React, {ChangeEvent} from 'react';
import { TaskType} from "./AppWithRedux";
import EditableSpan from "./EdiatableSpan";
import { Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TasksPropsType = {
    task: TaskType
    todoListID: string
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
}

const Task = React.memo(({task,todoListID,changeTaskStatus,removeTask,changeTaskTitle}: TasksPropsType) => {
  //  const {task,todoListID,changeTaskStatus,removeTask,changeTaskTitle} = props - деструктуризация в (парметрах аналогичная запись)
    const onTitleChangeHandler = (title: string) => changeTaskTitle(todoListID, title, task.id)
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListID, e.currentTarget.checked, task.id)
    }
    const onClickHandler = () => {
        removeTask(task.id, todoListID)
    }
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
