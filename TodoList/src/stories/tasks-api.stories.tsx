import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {tasksApi} from "../api/todolist-api";

export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '83f917ab-2c93-4005-8c24-e3f0d3369a0c'
        axios.get(`todo-lists/${todolistId}/tasks`)
        tasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '83f917ab-2c93-4005-8c24-e3f0d3369a0c'
        axios.post(`todo-lists/${todolistId}/tasks`,{title:'axios'}, { headers:{
                'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
            },
            withCredentials: true,})
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '83f917ab-2c93-4005-8c24-e3f0d3369a0c'
    const taskId = '5f155f75-04f2-460c-8af4-5081f702b14d'
    useEffect(() => {
        axios.delete(`todo-lists/${todolistId}/tasks/${taskId}`, { headers:{
                'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
            },
            withCredentials: true,})
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
