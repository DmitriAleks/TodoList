import React, {useEffect, useState} from 'react'
import axios from 'axios';

export default {
    title: 'API',
    headers: {
        'API-KEY': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    },
}


const settings = {
    withCredentials: true
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "Axios"
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then( (res) => {
                setState(res.data);
            } )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '7171c975-9f3b-44af-bcfb-730b636817c5';
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists', settings,)
            .then((res) => {
                setState(res.data);
            })

    }, [])
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

