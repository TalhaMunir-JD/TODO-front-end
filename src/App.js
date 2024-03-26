import { useEffect, useState } from 'react';
import './App.css';
import DisplayTasks from './Components/DisplayTasks';
import AddTasks from './Components/AddTasks';
import taskservice from './Services/Tasks'

function App() {

  const[tasks, setTasks] = useState([])

  useEffect(()=>{
    taskservice.getAllTasks().then(response=>{
      console.log(response.data)
      setTasks(response.data)
    })
  },[])

  return (
    <div className='App' style={{display:'flex', flexDirection:'row', justifyContent:'center', gap:'250px'}}>
      <AddTasks tasksList={tasks} setTasks={setTasks}/>
      <DisplayTasks tasksList={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
