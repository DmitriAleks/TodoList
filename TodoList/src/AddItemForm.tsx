import React, {useState, KeyboardEvent, ChangeEvent, ChangeEventHandler} from 'react';
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}
 const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('addItem')
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                error={error}
                label={'Title'}
                helperText={error && 'Title is required'}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                size={'small'}
                onBlur={()=>setError(false)}
            />

            <IconButton onClick={onClickAddItem} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>

    )
})

export default AddItemForm