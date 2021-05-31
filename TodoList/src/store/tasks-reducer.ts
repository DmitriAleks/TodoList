import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";


type FirstAT = {
    type: ''
}
type SecondAT = {
    type: ''
}

export type ActionUnionType = FirstAT|SecondAT

export const tasksReducer = (todoLists: TaskStateType, action: ActionUnionType): Array<TodoListType> => {
    switch (action.type) {
        case "":
            return todoLists
        case "":
            return todoLists

        default:
            return todoLists
    }

}

export const firstTasksAC = (todoListID:string):FirstAT => {
    return {type: ''}
}
export const secondAC = (title:string):SecondAT => {
    return {type: ''}
}












