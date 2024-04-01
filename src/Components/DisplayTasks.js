import { Table, TableBody, TableCell, TableRow, Button, TableHead, Paper } from "@mui/material";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTasks";
import { useState } from "react";
import taskService from '../Services/Tasks';
import { MdModeEdit } from "react-icons/md";
import EditName from "./EditName";
import EditDescription from "./EditDescription";

function DisplayTasks({ tasksList, setTasks }){

    const[Editedtaskid, setEditedTaskid] = useState(null)
    const[showDescriptionid, setShowDescriptionid] = useState([])
    const[editNameid, setEditNameid] = useState(null)
    const[editDescriptionId, setEditDescriptionId] = useState(null)

    const handleTaskClick = (taskid) => {
        let tasks = [...showDescriptionid]
        const index = tasks.indexOf(taskid)
        if(index === -1){
            tasks.push(taskid)
        }else{
            tasks.splice(index, 1)
        }

        setShowDescriptionid(tasks)
    }

// Handling the task editing here and below
    const handleEditButtonClick = (taskid) => {
        setEditedTaskid(taskid)
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

// Handling the name editing of the task here and below
    const handlenameedit = (taskid) => {
        setEditNameid(taskid)
    }

    const editNameCancel=()=>{
        setEditNameid(null)
    }

    const editNameSubmit=(taskId, name)=>{
        console.log(name, taskId, typeof(taskId))
        const editedName = {
            'name': name
        }
        taskService.editName(taskId, editedName).then(response=>{
            console.log("response from the editname request is: ",response)
            console.log(editedName);
            const updatedTasksList = tasksList.map(task => {
                if (task.id === taskId) {
                    return {...task, 'name': name}
                } else {
                    return task;
                }
            });
            // Update state with the updated tasks list
            setTasks(updatedTasksList);
            setEditNameid(null)
        }).catch(error=>{

            console.log("Error occured in edit name request: ", error)
        })
        console.log("Name editted successfully.")
    }

//edit description request here.
    const handledescriptionedit = (taskid) => {
        setEditDescriptionId(taskid)
    }

    const editdescriptionCancel = () => {
        setEditDescriptionId(null)
    }

    const editDescriptionSubmit = (taskId, description) => {
        console.log(description, taskId, typeof(taskId))
        const editedDescription = {
            'description': description
        }
        taskService.editDescription(taskId, editedDescription).then(response=>{
            const updatedTasksList = tasksList.map(task => {
                if (task.id === taskId) {
                    return {...task, 'description': description}
                } else {
                    return task;
                }
            });
            // Update state with the updated tasks list
            setTasks(updatedTasksList);
            setEditDescriptionId(null)
        }).catch(error=>{
            console.log(error.message)
        })
    }

    return(
        <div>
            <h1>Tasks</h1>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell align="center"><strong>Task no</strong></TableCell>
                        <TableCell align="center"><strong>Task</strong></TableCell>
                        <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tasksList && tasksList.length > 0 ?
                        tasksList.map((task, index) => (
                            <TableRow key={task.id}>
                                <TableCell>{index = index + 1}</TableCell>
                                <TableCell align="center" key={index} >
                                    <span onClick={()=>handleTaskClick(task.id)}>
                                    {
                                        editNameid === task.id ?
                                        (<EditName Task={task} onSubmit={editNameSubmit} onCancel={editNameCancel}/>)
                                        : (task.name)
                                    }
                                    </span>
                                    {
                                        editNameid === task.id
                                        ? null :
                                        (<MdModeEdit onClick={()=>handlenameedit(task.id)} style={{marginLeft:'5px'}}/>)
                                    }
                                    {
                                        editDescriptionId === task.id ? 
                                        (<EditDescription Task={task} onSubmit={editDescriptionSubmit} onCancel={editdescriptionCancel}/>)
                                        : (showDescriptionid.indexOf(task.id) !== -1 && <p>{task.description} <MdModeEdit onClick={()=>handledescriptionedit(task.id)}/></p>)
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        Editedtaskid === task.id ?
                                        (<EditTask taskitem={task} onsubmit={handleEditSubmit} oncancel={handleEditCancel}/>)
                                        : (<div style={{display:'flex'}}>
                                            <Button variant="contained" size="small" onClick={()=>handleEditButtonClick(task.id)}>Edit Task</Button>
                                            <DeleteTask tasksList={tasksList} taskitem={task} setTasks={setTasks} />
                                        </div>)
                                    }
                                </TableCell>
                                {/* <TableCell align="center">
                                    <DeleteTask tasksList={tasksList} taskitem={task} setTasks={setTasks} />
                                </TableCell> */}
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayTasks;
