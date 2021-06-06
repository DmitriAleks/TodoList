import React, {useReducer, useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
//2/05
function AppWithRedux() {
//BLL:
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer,[
        {id: todoListID_1, title: 'what to learn', filter: 'all'},
        {id: todoListID_2, title: 'what to buy', filter: 'all'}
    ])
    const [tasks,  dispatchToTasks] = useReducer(tasksReducer ,{
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "DzIgnata", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: false},
            {id: v1(), title: "Cola", isDone: false},
        ]
    })

    function removeTasks(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID,todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title,todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID,newIsDoneValue,todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID,newTitle,todoListID))
    }

    //todoLists:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListFilterAC(value,todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(ChangeTodoListTitleAC(title,todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    function addTodoList(title: string) {
        let action = AddTodoListAC(title)
        dispatchToTodoLists(action)
       dispatchToTasks(action)
    }

//UI:
    function getTasksForTodolist(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid item >
            <Paper elevation={8} style={{padding: '20px'}}>
                <TodoList
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={getTasksForTodolist(tl)}
                    filter={tl.filter}
                    removeTask={removeTasks}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                />
            </Paper>
            </Grid>
        )
    })
    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar style={{justifyContent:'space-between'}}>
                    <IconButton color={'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        Todolist
                    </Typography>
                    <Button color={'inherit'} variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'20px 0px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithRedux;
