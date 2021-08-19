import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'

function App() {
    export function ErrorSnackbar() {
        const [open, setOpen] = React.useState(true)

        const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
            if (reason === 'clickaway') {
                return
            }
            setOpen(false)
        }

        return (
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    This is a success message!
                </Alert>
            </Snackbar>
        )
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    )
}

export default App
