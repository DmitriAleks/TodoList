import {FilterValuesType, TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";


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
type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}


    export type ActionUnionType = RemoveTaskAT|AddTaskAT|ChangeTaskStatusAT|ChangeTaskTitleAT|AddTodoListAT|RemoveTodoListAT

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
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoListID]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
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
export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string):ChangeTaskTitleAT => {
    return {type: 'CHANGE_TASK_TITLE', taskID, newTitle, todoListID}
}










