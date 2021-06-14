import {
    AddTodoListAC,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TaskStateType, TodoListType} from '../AppWithRedux';
import { tasksReducer } from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    //{'qqq':[]}
    // [{id:'qqq', title:'new todolist', filter: 'all'}]

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodoLists).toBe(action.todoListID);
});






