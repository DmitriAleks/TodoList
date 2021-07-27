import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
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
    useEffect(() => {
      todolistApi.createTodos()
            .then((res) => {
                debugger
                setState(res.data)
            })
            .catch((err) => {
                debugger
                setState(err.message)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistApi.deleteTodos()
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                debugger
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
        todolistApi.updateTodos(endpoint,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

