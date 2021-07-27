import axios from "axios";

const instance = axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    headers:{
        'api-key': 'f98497de-3aa4-4fb0-ba69-3087854eec9e'
    },
    withCredentials: true,
})
export type TodoType =  {
    id: string;
    title: string;
    addedDate: string;
    order: number;
}
export type CreateTodoResponseType = {
    data: {
        item: TodoType
    } ,
    fieldsErrors: Array<string>,
    messages: Array<string>,
    resultCode: number,
}
export type UpdateDeleteTodoResponseType = {
    resultCode: number
    messages: Array<string>,
    data: TodoType
}


export const todolistApi = {
    getTodos() {
      return  instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title:string) {
        return   instance.post<CreateTodoResponseType>('todo-lists', {title} )
    },
    deleteTodos(todolistId: string) {
     return   instance.delete<UpdateDeleteTodoResponseType>(`todo-lists/${todolistId}` )
    },
    updateTodoTitle(todolistId: string, title:string) {
       return instance.put<UpdateDeleteTodoResponseType>(`todo-lists/${todolistId}`, {title} )
    }
}