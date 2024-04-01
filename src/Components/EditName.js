import { Button, TextField } from "@mui/material";
import { useState } from "react"

function EditName({Task, onSubmit, onCancel}){
    const[editname, setEditedName] = useState(Task.name)

    const handleCancelForm= () => {
        onCancel();
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        onSubmit(Task.id, editname)
    }

    return(
        <div>
            <form onSubmit={handleFormSubmit}>
                <TextField size="small" type="text" name="editName" value={editname} onChange={(event)=>setEditedName(event.target.value)}/>
                <div style={{margin:'10px', display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <Button variant="contained" color="success" size='small' type="submit">Edit</Button>
                    <Button variant="contained" color="error" size='small' type="submit" onClick={handleCancelForm}>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default EditName;