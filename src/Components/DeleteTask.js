import { MdDelete } from "react-icons/md";
import taskService from '../Services/Tasks';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

function DeleteTask({ tasksList, taskitem, setTasks }){
    
    const id = taskitem.id 
    const handleDeleteFunctionality = () => {
        const confirmed = window.confirm(`Are you sure you want to delete the task ${taskitem.name}?`)
        console.log(confirmed)
        if(confirmed){
            console.log('taskitem is defined as: ', taskitem)
            taskService.deleteTask(id).then(response=>{
                console.log('After successfull deletion of the task', response)
                if(response.status === 200){
                    const updatedTasks = tasksList.filter(task => task.id !== id)
                    console.log('updated list of tasks are: ', updatedTasks)
                    setTasks(updatedTasks)
                }
            }).catch(error=>{
                console.log("Error while deleting the resource: ", error.message)
            })
        }
        
    }
    return(
        <div style={{marginTop: '5px',}} id="Delete">
            <IconButton onClick={handleDeleteFunctionality}>
                <DeleteIcon aria-label="delete"/>
            </IconButton>
            {/* <MdDelete onClick={handleDeleteFunctionality}/> */}
        </div>
    )
}

export default DeleteTask;