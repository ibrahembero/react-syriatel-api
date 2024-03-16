import React, {  useState } from 'react';
import axios from 'axios';

function Login(){
  // "proxy":"https://bms.syriatel.sy/",
    const apiUrl = 'API.asmx?op=';
    // const apiUrl = 'API/';
    const endPoint = 'LoginMethod';
   const [data,setData] = useState({
    username : '',
    password : '',
   });
   const [id,setId] = useState('')
   const [user_name,setUser_name] = useState('')
   const [role,setRole] = useState()
   const [token,setToken] = useState('')
  
  

   const handleChange = (e)=>{
        const {name , value} = e.target
        setData({...data,[name]:value})
   }
    //// Handle submit function
    const handleSubmit = async e =>{
        e.preventDefault()
        const username = e.target.username.value;
        const password = e.target.password.value;
        const xml = `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <LoginMethod xmlns="http://tempuri.org/">
              <username>${username}</username>
              <password>${password}</password>
            </LoginMethod>
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
        const id = xmlDocument.querySelector('id').textContent;
        console.log(id)
        setId(id)
        const user_name = xmlDocument.querySelector('UserName').textContent;
        console.log(user_name)
        setUser_name(user_name)
        const role = xmlDocument.querySelector('role').textContent;
        console.log(role)
        setRole(role)
        const token = xmlDocument.querySelector('token').textContent;
        console.log(token)
        setToken(token)
        
        
};

    return (
        <main className="main">
             <section className="content"> 
            <p className="syriatel">Supabase Syriatel api login</p>
            <h1>Welcome back! Glad to see you, Again!</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" id="username" name="username"  value={data.username}   onChange={handleChange} placeholder="Enter your username" />
                <input type="password" id="password" name="password" value={data.password}   onChange={handleChange} placeholder="Enter your password" />
               <button type="submit">Login</button>
               </form>
             </section>
             <section className="content">
               <h2>{id}</h2>
               <h2>{user_name}</h2>
               <h2>{role}</h2>
               <h2>{token}</h2>
             </section>
    </main>
        
    )
}

export default Login;