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
            <div>
                {
                    tasksList && tasksList.length > 0 ?
                    tasksList.map((task, index)=>(
                        <div key={index} style={{display: 'flex', justifyContent: 'center', gap: '30px', alignContent:'center'}}>
                            <p key={index}>{task.id} {task.name}</p> 
                            {/* {console.log(task)} */}
                            <EditTask taskitem={task} />
                            <DeleteTask tasksList={tasksList} taskitem={task} setTasks={setTasks} />
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

export default DisplayTasks;
