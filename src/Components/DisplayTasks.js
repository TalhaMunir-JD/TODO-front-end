import { Table, TableBody, TableCell, TableRow, Button } from "@mui/material";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTasks";
import { useState } from "react";
import taskService from '../Services/Tasks';

function DisplayTasks({ tasksList, setTasks }){

    const[Editedtaskid, setEditedTaskid] = useState(null)

    const handleEditButtonClick = (taskid) => {
        setEditedTaskid(taskid)
        console.log(taskid)
    }

    const handleEditSubmit = (taskId, newName, newDescription) => {
        console.log(newName, newDescription)
        const editedTask = {
            id: taskId,
            name: newName,
            description: newDescription
        }
        taskService.editTasks(taskId, editedTask).then(response=>{
            console.log("response from edit request: ", response)
            // setTasks(prevTasks=>[...prevTasks.filter(task => task.id !== taskId), response.data])
            const updatedTasksList = tasksList.map(task => {
                if (task.id === taskId) {
                    return editedTask;
                } else {
                    return task;
                }
            });
            // Update state with the updated tasks list
            setTasks(updatedTasksList);
            setEditedTaskid(null)
        }).catch(error=>{
            console.log("error during editing the task: ", error.message)
        })
        setEditedTaskid(null);
    };

    const handleEditCancel = () => {
        setEditedTaskid(null)
    }
    
    return(
        <div>
            <h1>Tasks</h1>
            <Table style={{width: '100%', display:'flex', justifyContent: 'center'}}>
                <TableBody>
                    {
                        tasksList && tasksList.length > 0 ?
                        tasksList.map((task, index)=>(
                            <TableRow key={index}>
                                <TableCell align="center" key={index}>
                                    {task.id} {task.name} 
                                </TableCell>
                                {/* {console.log(task)} */}
                                <TableCell align="center">
                                    {
                                        Editedtaskid === task.id ?
                                        (<EditTask taskitem={task} onsubmit={handleEditSubmit} oncancel={handleEditCancel}/>)
                                        : (<Button variant="contained" size="small" onClick={()=>handleEditButtonClick(task.id)}>Edit Button</Button>)
                                    } 
                                </TableCell>
                                <TableCell align="center">
                                    <DeleteTask tasksList={tasksList} taskitem={task} setTasks={setTasks} />
                                </TableCell>
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayTasks;
