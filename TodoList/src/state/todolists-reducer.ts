import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppRootStateType} from '../app/store';

// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
type ActionsType =
    |RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | setTodolistsACType
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET-TODOLIST-AC":
            return action.todolists.map((tl) => ({...tl, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl=> tl.id===action.id ? {...tl, title: action.title}: tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl=> tl.id === action.id? {...tl, filter:action.filter}: tl)
        default:
            return state;
    }
}
// actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title: title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLIST-AC', todolists} as const
}
// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}
export const createTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(title))
        })
}
export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const changedTitleTodolistTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
}


