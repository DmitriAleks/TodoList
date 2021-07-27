import axios from 'axios'
import React, {useEffect, useState} from 'react'

export default {
    title: 'API'


}
const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials:true})
            .then((res)=>{
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title:"new Todolist"}, settings)
            .then((res)=>{
                debugger
                setState(res.data)
            })
            .catch((err)=>{
                debugger
                setState(err.message)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/1f6cc4a2-db93-499c-96d0-e1659b72c103',settings )
            .then((res)=>{
                setState(res.data)
            })
            .catch((err)=> {
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
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${endpoint}`, {title: 'Changed TodoII'},settings)
            .then((res)=>{
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

