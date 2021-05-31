import {FilterValuesType, TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTaskAT = {
    type: 'REMOVE_TASK',
    taskID:string
    todoListID: string
}
type AddTaskAT = {
    type: 'ADD_TASK'
    title: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string
    newIsDoneValue: boolean
    todoListID: string
}


export type ActionUnionType = RemoveTaskAT|AddTaskAT|ChangeTaskStatusAT

export const tasksReducer = (state: TaskStateType, action: ActionUnionType):TaskStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
        ...state,
            [action.todoListID] : state[action.todoListID].filter(t => t.id !== action.taskID)
    }
        case 'ADD_TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todoListID]: [newTask, ...state[action.todoListID]]

    }
        case 'CHANGE_TASK_STATUS':

            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDoneValue} : t)

            }

        default:
            return state
    }

}

export const removeTaskAC = (taskID:string, todoListID:string):RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskID, todoListID : todoListID}
}
export const addTaskAC = (title: string, todoListID: string):AddTaskAT => {
    return {type: 'ADD_TASK', title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, newIsDoneValue: boolean, todoListID: string):ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', taskID, newIsDoneValue, todoListID}
}











