import { useState } from "react";
import taskService from "../Services/Tasks";
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

function AddTasks ({ tasksList, setTasks}) {
    const[newTask, setNewTask] = useState('')
    const[newDescription, setnewDescription] = useState('')

    const handleTaskSubmit = (event) => {
        event.preventDefault()
        
        if(newTask.trim() !== ''){
            const newObj = {
                name: newTask,
                description: newDescription
            }
            taskService.createTasks(newObj).then(response=>{
                console.log("post request response: ",response)
                setTasks([...tasksList, response.data])
                setNewTask('')
                setnewDescription('')
            }).catch(error=>{
                console.log("error during post request: ",error.message)
            })
        }else{
            return(<div>
                Add appropriate title for the Task
            </div>)
        }
    }

    const handleInputChange = (event) => setNewTask(event.target.value)

    const handleDescriptionChange = (event) => setnewDescription(event.target.value)
    
    return(
        <div>
            <div style={{display:'flex', justifyContent:'center'}}>
                <form onSubmit={handleTaskSubmit} style={{display: "flex", flexDirection:'column', gap: '30px', padding:'30px'}}>
                    <TextField size="small" type="text" value={newTask} onChange={handleInputChange} placeholder="task..."/>
                    <TextField size="small" type="text" value={newDescription} onChange={handleDescriptionChange} placeholder="default description" />
                    <Button variant="contained" color="success" type="submit">Add Task</Button>
                </form>
            </div>
        </div>
    )
}

export default AddTasks;