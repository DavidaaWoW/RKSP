import React, {useEffect, useState} from "react";
import { useDispatch } from 'react-redux';
import {changeButtonStatus} from "../store/TermsFormSlice";
import classes from "./Form.module.css";
import axios from "axios";
import {useAuthUser} from "react-auth-kit";


export default function Tasks(){
    const dispatch = useDispatch();
    const headers = { headers: {'Content-Type': 'application/json'}}

    const auth = useAuthUser()
    const [taskDescr, setTaskDescr] = useState('');
    const [tasks_, setTasks] = useState([]);
    const [alert, setAlert] = useState('');

    const addTasks = (tasks) => setTasks(tasks);
    const addTask = async () => {
        const jsonBody = {
            username: auth().username,
            description: taskDescr
        };
        const response = await axios.post(
            "http://localhost:3002/tasks",
            jsonBody,
            headers
        );

        tasks();
    }

    const deleteTask = async (id, task_username) => {
        if(task_username != auth().username && auth().role!="admin"){
            setAlert("Error, you cant delete task that belong to another user!");
            return;
        }

        const jsonBody = {
            id: id
        };
        const response = await axios.delete(
            "http://localhost:3002/tasks", {
                data: jsonBody,
                headers: headers
            }
        );



        tasks();
    }
    const tasks = async () => {
        const jsonBody = {
        };
        const response = await axios.get(
            "http://localhost:3002/tasks",
        );
        addTasks(response.data.data.tasks);
    }

    useEffect(() => {
        tasks();
    }, []);

    return(
        <div>
            {
                  alert ? <div className="alert alert-danger">{alert}</div> : null
            }
            {
                tasks_.map((task) => (
                    <p onClick={() => deleteTask(task.id, task.username)} key={task.id}>{task.username}: {task.description}</p>
                ))
            }
            <div>
                <input type="text" onChange={(event) => setTaskDescr(event.target.value)}/>
                <button className="btn btn-submit" onClick={addTask}>Submit</button>
            </div>
        </div>
    );
}