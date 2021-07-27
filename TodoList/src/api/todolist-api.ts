import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    }
}

export const todolistApi = {
    getTodos() {
      return  axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodos() {
        return   axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: "new Todolist"}, settings)
    },
    deleteTodos() {
     return   axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/d5aca9ec-d9f4-47a2-8ea8-b2f463e8d4d4', settings)
    },
    updateTodos(endpoint: string,title:string) {
       return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${endpoint}`, {title}, settings)
    }
}