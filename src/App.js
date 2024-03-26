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
    <div className='App'>
      <AddTasks tasksList={tasks} setTasks={setTasks}/>
      <h1>Tasks will be displayed here</h1>
      <DisplayTasks tasksList={tasks} setTasks={setTasks}/>
    </div>
  );
}

export default App;
