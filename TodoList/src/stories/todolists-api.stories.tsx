import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'TodolistAPI'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
   const title = "new Todolist"
    useEffect(() => {
      todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = ''
    useEffect(() => {
       todolistApi.deleteTodos(todolistId)
            .then((res) => {
                setState(res.data)
                debugger
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let endpoint = 'd2747144-3fdf-43ee-abe3-efdd3c280ffc'
        let title = 'Changed TodoII'
        todolistApi.updateTodoTitle(endpoint,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

