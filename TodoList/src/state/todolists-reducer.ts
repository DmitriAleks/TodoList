import {FilterValuesType, TodoListType} from "../AppWithRedux";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListID: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListID: string
}
type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title:string
    todoListID:string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListID:string
}
// type SetTodolistTypeAT = ReturnType<typeof setTodolistAC>
type SetTodolistTypeAT = {
    type:'SET-TODOLIST'
}

export type ActionUnionType = RemoveTodoListAT|AddTodoListAT|ChangeTodoListTitleAT|ChangeTodoListFilterAT|SetTodolistTypeAT

// let initialState:Array<TodoListType> = []
let initialState:Array<TodoListType> = [] as Array<TodoListType>
    export type InitialTodoListsStateType =  typeof initialState

export const todoListsReducer = (state= initialState, action: ActionUnionType):InitialTodoListsStateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            const newTodoList: TodoListType = {id: action.todoListID, title: action.title, filter: 'all'}
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
           return  state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }

}

export const RemoveTodoListAC = (todoListID:string):RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListID: todoListID}
}
export const AddTodoListAC = (title:string):AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: title, todoListID: v1()}
}
export const ChangeTodoListTitleAC = (title:string,todoListID:string):ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID:todoListID }
}
export const ChangeTodoListFilterAC = (filter:FilterValuesType,todoListID:string):ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID:todoListID }
}
export const setTodolistAC = ():SetTodolistTypeAT => {
    return {type: 'SET-TODOLIST'}
}













