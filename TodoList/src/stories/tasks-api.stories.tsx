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
        tasksApi.createTask(todolistId)
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
        tasksApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
            .catch((err) => {
                setState(err.message)
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '83f917ab-2c93-4005-8c24-e3f0d3369a0c'
    const taskId = '2e84ae5a-a01a-478f-b90c-c7cec03af834'
    const testObject = {
        title: "Changed task",
        description: "Changed taskII",
        completed: false,
        status: 12,
        priority: 4,
        startDate: new Date(),
        deadline: new Date(),
    }
    useEffect(() => {
        tasksApi.updateTask(todolistId, taskId, testObject)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}