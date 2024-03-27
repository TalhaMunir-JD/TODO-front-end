import axios from 'axios';

const getAllTasks = () => {
    return(
        axios.get('http://localhost:8000/api/get/')
    )
}

const createTasks = (obj) => {
    return(
        axios.post('http://localhost:8000/api/post/', obj)
    )
}

const editTasks = (id, updatedTask) => {
    return(
        axios.put(`http://localhost:8000/api/put/${id}/`, updatedTask)
    )
}

const deleteTask = (id) => {
    return(
        axios.delete(`http://localhost:8000/api/delete/${id}/`)
    )
}

export default{
    getAllTasks: getAllTasks, 
    createTasks: createTasks, 
    editTasks: editTasks, 
    deleteTask: deleteTask
}