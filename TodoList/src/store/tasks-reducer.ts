import {FilterValuesType, TaskStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTaskAT = {
    type: 'REMOVE_TASK',
    taskID:string
    todoListID: string
}
type addTaskAT = {
    type: 'ADD_TASK'
    title: string
    todoListID: string
}

export type ActionUnionType = RemoveTaskAT|addTaskAT

export const tasksReducer = (state: TaskStateType, action: ActionUnionType) => {
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

        default:
            return state
    }

}

export const removeTaskAC = (taskID:string, todoListID:string):RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskID, todoListID : todoListID}
}
export const addTaskAC = (title: string, todoListID: string):addTaskAT => {
    return {type: 'ADD_TASK', title, todoListID}
}












