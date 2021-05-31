import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTaskAT = {
    type: 'REMOVE_TASK',
    taskID:string
    todoListID: string
}
type SecondAT = {
    type: ''
}

export type ActionUnionType = RemoveTaskAT|SecondAT

export const tasksReducer = (state: TaskStateType, action: ActionUnionType) => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
        ...state,
            [action.todoListID] : state[action.todoListID].filter(t => t.id !== action.taskID)
    }
        case "":
            return state

        default:
            return state
    }

}

export const removeTaskAC = (taskID:string, todoListID:string):RemoveTaskAT => {
    return {type: 'REMOVE_TASK', taskID, todoListID : todoListID}
}
export const secondAC = (title:string):SecondAT => {
    return {type: ''}
}












