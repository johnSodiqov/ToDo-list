import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../components/todoList.css"
import JobsData from './jobsData';
import jobsData from './jobsData';

const TodoList = () => {
    const [jobs, setjobs] = useState([]);
    const [jobTitle, setjobTitle] = useState("");
    const [jobDesription, setjobDesription] = useState("");

    const baseUrl = "https://648892c40e2469c038fe0414.mockapi.io/job-data"
    
    useEffect(() => {
        axios.get(baseUrl)
            .then(response => {
                setjobs(response.data)
            })
            .catch(err => console.log(err));

    }, []);

    function run(){
        jobsData.getJobs()
        .then(response =>{
            setjobs(response);
        })
    }

    function deleteJob(id) {
       JobsData.deleteJob(id)
       .then(response=>{
        console.log(response)
        run()
       })
    }
    
    function addJob(){
        let newJob = {
            status: true,
            title: jobTitle,
            description: jobDesription
        }

        JobsData.postJob(newJob)
        .then(response=>{
            console.log(response)
            run()
        })
    }

    function editJob(id,status){
        let newJob = {
            status: status,
            title: id.title,
            description: id.description
        }

        JobsData.editJob(newJob , id.id)
        .then(response=>{
            run()
        })
        
    }
    return (
        <div className='todo-list'>
            <div className="todo-sidebar">
                <div className="job-add-form">
                    <input className='form-control w-100' type="text" placeholder='Enter the job title' onChange={(val)=>setjobTitle(val.target.value)} />
                    <textarea className='w-100 job-descrition' name="job" id="" cols="30" rows="10" placeholder='Enter the job description' onChange={(val)=>setjobDesription(val.target.value)}></textarea>
                    <button className='btn btn-light' onClick={()=>addJob()}>Add Job</button>
                </div>
            </div>

            <div className="todo-jobs">
                <div className="todo-jobs-title w-100 my-5">
                    <h1 className='text-center fw-bold' style={{color: "#7700ff"}}>Jobs</h1>
                </div>
                <div className="row w-100 mx-auto ">

                    {
                        jobs.map((item, index) => {
                            return (
                                <div key={index} className={`col-5  job-item ${(item.status) ? " " : "done-jobs"}`}>
                                    <div className='row w-100'>
                                        <h4 className='col-10'>{item.title}</h4>
                                        <div className="dropdown col-2 text-end">
                                            <button className="btn  dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            </button>

                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><button className="dropdown-item fw-bold text-success" onClick={() => editJob(item,false)} >Finish job</button></li>
                                                <li><button className="dropdown-item fw-bold text-primary" onClick={() => editJob(item,true)}>Activate Job</button></li>
                                                <li><button className="dropdown-item fw-bold text-danger" onClick={() => deleteJob(item.id)}>Delete Job</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <p>{item.description}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    );
}

export default TodoList;
