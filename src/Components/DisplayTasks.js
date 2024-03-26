import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTasks";

function DisplayTasks({ tasksList, setTasks }){

    // const handleTaskClick = ({ description }) => {
    //     return(<div>
    //         <p>{description}</p>
    //         { console.log(description) }
    //     </div>)
    // }
    
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
                                    <EditTask taskitem={task} />
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
