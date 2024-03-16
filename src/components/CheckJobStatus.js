import axios from "axios";
import { useState } from "react";

function CheckJobStatus() {
    const apiUrl = 'API.asmx?op=';
    // const apiUrl = 'API/';
    const endPoint = 'LoginMethod';
   const [data,setData] = useState({
    username : '',
    password : '',
    job_id : '',
   });
    const [jobStatusResult,setJobStatusResult] = useState('')

  
  

   const handleChange = (e)=>{
        const {name , value} = e.target
        setData({...data,[name]:value})
   }
    //// Handle submit function
    const handleSubmit = async e =>{
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const job_id = e.target.job_id.value;
        const xml = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <CheckJobStatus xmlns="http://tempuri.org/">
              <user_name>${username}</user_name>
              <password>${password}</password>
              <job_id>${Number(job_id)}</job_id>
            </CheckJobStatus>
          </soap:Body>
        </soap:Envelope>`;
        const {data} = await axios.post(apiUrl+endPoint,xml,
        {
            headers: {
           "Access-Control-Allow-Origin" : "*",
           "Access-Control-Allow-Credentials": true,
            "Content-Type": "text/xml",
            }
        }
            );
        console.log(data)
        const xmlDocument = new DOMParser().parseFromString(data,"text/xml");
        console.log(xmlDocument)
        const jobStatusResult = xmlDocument.querySelector('CheckJobStatusResult').textContent;
        console.log(jobStatusResult)
     
        
        
};

    return (
        <main className="main">
             <section className="content"> 
            <p className="syriatel">Supabase Syriatel api checK Job Status</p>
            <h1>Welcome back! Glad to see you, Again!</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" id="username" name="username"  value={data.username}   onChange={handleChange} placeholder="Enter your username" />
                <input type="password" id="password" name="password" value={data.password}   onChange={handleChange} placeholder="Enter your password" />
                <input type="int" id="jobid" name="job_id" value={data.job_id}   onChange={handleChange} placeholder="Enter your job id" />
               <button type="submit">Login</button>
               </form>
             </section>
             <section className="content">
               <h2>
                {jobStatusResult}
               </h2>
             </section>
    </main>
        
    )
}

export default CheckJobStatus;
