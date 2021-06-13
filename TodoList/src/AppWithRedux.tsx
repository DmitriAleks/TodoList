import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    InitialTodoListsStateType,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

    const todoLists = useSelector<AppRootStateType,InitialTodoListsStateType>(state => state.todolists)
    const tasks = useSelector<AppRootStateType,TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    function removeTasks(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID,todoListID))
    }

    const addTask =useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title,todoListID))
    },[])

    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID,newIsDoneValue,todoListID))
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID,newTitle,todoListID))
    }

    //todoLists:

    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatch(ChangeTodoListFilterAC(value,todoListID))
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(ChangeTodoListTitleAC(title,todoListID))
    }

    function removeTodoList(todoListID: string) {
        let action = RemoveTodoListAC(todoListID)
        dispatch(action)
    }

    const addTodoList = useCallback((title: string)=> {
        let action = AddTodoListAC(title)
        dispatch(action)
    },[])

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
