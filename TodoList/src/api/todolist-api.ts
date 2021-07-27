import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    headers:{
        'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    },
    withCredentials: true,
})


export const todolistApi = {
    getTodos() {
      return  instance.get('todo-lists')
    },
    createTodo(title:string) {
        return   instance.post('todo-lists', {title} )
    },
    deleteTodos(todolistId: string) {
     return   instance.delete(`todo-lists/${todolistId}` )
    },
    updateTodosTitle(todolistId: string, title:string) {
       return instance.put(`todo-lists/${todolistId}`, {title} )
    }
}