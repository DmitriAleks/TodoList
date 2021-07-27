import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    headers:{
        'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    },
    withCredentials: true,
})

export type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
    data: {
        item: T
    } ,
}

export type TodoType =  {
    id: string,
    title: string,
    addedDate: string,
    order: number,
}

export const todolistApi = {
    getTodos() {
      return  instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title:string) {
        return   instance.post<CommonResponseType<{ item: TodoType } >>('todo-lists', {title} )
    },
    deleteTodos(todolistId: string) {
     return   instance.delete<CommonResponseType>(`todo-lists/${todolistId}` )
    },
    updateTodoTitle(todolistId: string, title:string) {
       return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title} )
    },
}

