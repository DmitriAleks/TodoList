import {TasksStateType} from '../app/App';
import {AddTodolistActionType, RemoveTodolistActionType,  setTodolistsACType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "../app/store";



// types
type ActionsType =
    |ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistsACType
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {
    // 'id1': [],
    // 'id2': [],
    // 'id3': [],

    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'CHANGE-TASK-STATUS': {
            // return {...state, [action.todolistId]: [action.todolistId].map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            // }
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}


        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLIST-AC": {
            action.todolists.forEach((tl) => {
                state[tl.id] = []
            })
            return state
        }
        default:
            return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
// thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTasks(todolistId).then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(tasks, todolistId))
        })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
}
export const addTaskTC = (todolistId: string, taskTitile: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTask(todolistId, taskTitile)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    const needTask = getState().tasks[todolistId].find((t) => t.id === taskId)
    // const appState = getState();
    // const allTask = appState.tasks
    // const taskForClickedTodo = allTask[todolistId]
    // const needTask = taskForClickedTodo.find((t) => t.id === taskId)
    if (needTask) {
        const model: UpdateTaskModelType = {
            title: needTask.title,
            status,
            deadline: needTask.deadline,
            description: needTask.description,
            priority: needTask.priority,
            startDate: needTask.startDate,
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todolistId))
            })
    }
}
export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    const needTask = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (needTask) {
        const model: UpdateTaskModelType = {
            title,
            status: needTask.status,
            deadline: needTask.deadline,
            description: needTask.description,
            priority: needTask.priority,
            startDate: needTask.startDate,
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res) => {
                dispatch(changeTaskTitleAC(taskId, title, todolistId))
            })
    }
}
// export const testAC = (taskId: string, info: UpdateTaskModelType, todolistId: string) => ({type: 'CHANGE-TASK-STATUS', info, todolistId, taskId} as const)
// export const testUpdateALlTC = (todolistId: string, taskId: string, info: UpdateTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
//     const needTask = getState().tasks[todolistId].find((t) => t.id === taskId)
//     if (needTask) {
//         const model: UpdateTaskModelType = {
//             title: needTask.title,
//             status: needTask.status,
//             deadline: needTask.deadline,
//             description: needTask.description,
//             priority: needTask.priority,
//             startDate: needTask.startDate,
//             ...info
//         }
//         todolistsAPI.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 dispatch(testAC(taskId, model, todolistId))
//             })
//     }
// }
