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


 type testObjectType = {
     title: string,
     description: string,
     completed: boolean,
     status: number,
     priority: number,
     startDate: Date,
     deadline: Date,
}


export const tasksApi = {
    getTasks(todolistId:string) {
      return  instance.get(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId:string) {
        return  instance.post(`todo-lists/${todolistId}/tasks`, {title: 'New TaskII'})
    },
    deleteTask(todolistId:string, taskId:string){
    return   instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId:string,taskId:string,testObject:testObjectType){
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,testObject)
    }
}