import { Button, TextField } from "@mui/material";
import { useState } from "react"

function EditDescription({Task, onSubmit, onCancel}){
    const[editDescription, setEditedDescription] = useState(Task.description)

    const handleCancelForm= () => {
        onCancel();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onSubmit(Task.id, editDescription)
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <TextField size="small" type="text" name="editDescription" value={editDescription} onChange={(event)=>setEditedDescription(event.target.value)}/>
                <div style={{margin:'10px', display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <Button variant="contained" color="success" size='small' type="submit">Edit</Button>
                    <Button variant="contained" color="error" size='small' type="submit" onClick={handleCancelForm}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default EditDescription;