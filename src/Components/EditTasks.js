import Button from '@mui/material/Button';
import { useState } from 'react';
import { TextField } from '@mui/material'

function EditTask({ taskitem, onsubmit, oncancel }){
    const[editedTask, seteditedTask] = useState(taskitem.name)
    const[editedDescription, seteditedDescription] = useState(taskitem.description)

    const handleCancelForm= () => {
        oncancel();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onsubmit(taskitem.id, editedTask, editedDescription)
    }

    const handletaskChange = (event) => seteditedTask(event.target.value)

    const handleDescriptionChange = (event) => seteditedDescription(event.target.value)

    return(
        <form onSubmit={handleFormSubmit} style={{display: "flex", gap: '30px', padding:'30px'}}>
            <TextField size="small" type="text" value={editedTask} onChange={handletaskChange} placeholder="task..."/>
            <TextField size="small" type="text" value={editedDescription} onChange={handleDescriptionChange} placeholder="default description" />
            <Button variant="contained" color="success" size='small' type="submit">Edit</Button>
            <Button variant='contained' color='error' size='small' type="button" onClick={handleCancelForm}>Cancel</Button>
        </form>
    )
}

export default EditTask;
