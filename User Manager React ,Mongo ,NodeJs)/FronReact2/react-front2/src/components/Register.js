import React,{useState} from 'react';
import { AddUser } from '../actions/actions';
import {Link,useHistory} from 'react-router-dom'
const Register=()=>{
    let history=useHistory();
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [city,setCity]=useState("");
    const [profilePic,setProfilePic]=useState("");
    const [errUStyle,setErrUStyle]=useState("none");
    const [errULEnStyle,setErrULenStyle]=useState("none");
    const [errEStyle,setErrEStyle]=useState("none");
    const [errERegStyle,setErrERegStyle]=useState("none");
    const [errCStyle,setErrCStyle]=useState("none");
    const [errIStyle,setErrIStyle]=useState("none");

    return(
        <div className="col-12 m-auto text-center">
    <form encType="multipart/form-data"  className="form-group mt-5">
        <input type="text" className='form-control col-5 d-inline'  placeholder="Enter username"
         required onChange={
             (event)=>{setUsername(event.target.value)     
             }}/><br></br>
                             {
                    
                    username==="" && <p style={{color:"red",display:errUStyle}}> must put username</p>

                 }
                 {                    username.length<=3&& <p style={{color:"red",display:errULEnStyle}}> must put username with length above 3 characters</p>
}
        <input type="email" className='form-control col-5 mt-2 d-inline'  required placeholder="Enter email"  onChange={(event)=>{setEmail(event.target.value)}}/>
        {
                    
                        email==="" && <p style={{color:"red",display:errEStyle}}> must put email</p>
                    }
                    {(email.includes("@")===false&& email.includes(".com")===false)&&<p  style={{color:"red",display:errERegStyle}}>must write valid format of email</p>}
                    <br></br>
        <input type="text" className='form-control col-5 mt-2 d-inline'  placeholder="Enter city" required onChange={(event)=>{setCity(event.target.value)
             console.log(city)}}/>
                                          {
                    
                    city==="" && <p style={{color:"red",display:errCStyle}}> must put city</p>
                 }
                 <br></br>
        <input type="file" id="profilePic" className="mt-2"  accept=".png"  name="profilePic" onChange={ (event)=>{ setProfilePic( event.target.files[0])
        }}/> 
                                     {
                    
                    profilePic==="" && <p style={{color:"red" ,display:errIStyle}}> must put image</p>
                 }
           </form>
       <input className="btn btn-success" type="button"value="Register" 
         onClick={()=>{
              
              const formData=new FormData()
               formData.append("username",username)
               formData.append("email",email)
               formData.append("city",city)
               formData.append("profilePic",profilePic)
  
               if(username!==""&&email!==""&&city!=="" &&profilePic!=="" &&email.includes("@")!==false&& email.includes(".com")!==false )
               { 
               AddUser(formData);
               history.push("/");
               }
               else{
                setErrUStyle("block")
                setErrEStyle("block")
                setErrCStyle("block")
                setErrIStyle("block")
                setErrERegStyle("block")
                setErrULenStyle("block")




               }
           }}/>
         
        </div>)
};

export default Register;