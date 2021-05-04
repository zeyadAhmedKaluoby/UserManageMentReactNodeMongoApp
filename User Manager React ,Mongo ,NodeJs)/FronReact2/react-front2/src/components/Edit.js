import React, { useState,useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { GetUserDetails, UpdateUser,UpdateImage} from '../actions/actions';
const Edit=(props)=>{
    const[loadedUser,setLoadedUsers]=useState([]);
    const p=useParams().username;
    const [username,setUsername]=useState();
    const [email,setEmail]=useState();
    const [city,setCity]=useState("");
    const [uval,setUval]=useState("");
    const [evalue,setEval]=useState("");
    const [cval,setCval]=useState("");
    const [ival,setIval]=useState("");
    const [showedImage,setShowedImage]=useState();
    const [errUStyle,setErrUStyle]=useState("none");
    const [errULEnStyle,setErrULenStyle]=useState("none");
    const [errEStyle,setErrEStyle]=useState("none");
    const [errERegStyle,setErrERegStyle]=useState("none");
    const [errCStyle,setErrCStyle]=useState("none");
    const [errIStyle,setErrIStyle]=useState("none");
    let history=useHistory();
    useEffect(async () => {
        try {
            const data = (await GetUserDetails(p)).payload
            setLoadedUsers(data);
            setUval(data.username)
            setEval(data.email)
            setCval(data.city)
            setIval(data.profilePic)
            setShowedImage(`http://localhost:5000/${data.profilePic}`)
            console.log(ival)
        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
        <div className="col-12  ">
    <form encType="multipart/form-data" className="form-group mt-5">
       
        <label className="container" >
        <img src={showedImage} className="rounded-circle image" style={{width:200,height:200}} />
        <div class="middle">
             <div class="text">Edit Image</div>
        </div>
        <input type="file" name="profilePic" id="profilePic" hidden
                onChange={(event)=>{setIval(event.target.files[0])
                    setShowedImage(URL.createObjectURL(event.target.files[0]))
                }}/>
        </label>
                 { 
                    ival==="" && <p style={{color:"red" ,display:errIStyle}}> must put image</p>
                 }
        
        
        <input type="text" placeholder="Enter username"  className='form-control col-5' readOnly value={`${uval}`||``} required onChange={(event)=>{setUsername(event.target.value)

        setUval(event.target.value)}
    }/>
      <br></br>
                             {
                    
                    uval==="" && <p style={{color:"red",display:errUStyle}}> must put username</p>

                 }
                 {                    uval.length<=3&& <p style={{color:"red",display:errULEnStyle}}> must put username with length above 3 characters</p>
}
        <input type="email" required placeholder="Enter email"className='form-control col-5 mt-2' value={`${evalue}`||``} required onChange={(event)=>{setEmail(event.target.value)
        setEval(event.target.value)}}/>
           {evalue==="" && <p style={{color:"red",display:errEStyle}}> must put email</p>
                 }
                 {(evalue.includes("@")===false&& evalue.includes(".com")===false)&&<p  style={{color:"red",display:errERegStyle}}>must write valid format of email</p>}
                 <br></br>
        <input type="text" placeholder="Enter city"className='form-control col-5 mt-2' value={`${cval}`||``} required onChange={(event)=>{setCity(event.target.value)
        setCval(event.target.value)}
        
        }/>
        {
                    
                    cval==="" && <p style={{color:"red",display:errCStyle}}> must put city</p>
                 }
                 <br></br>
            
           
        <input className="btn btn-success d-block mt-3 " type ="button" onClick={async()=>{
                        const formData=new FormData()
                        formData.append("username",uval)
                        formData.append("email",evalue)
                        formData.append("city",cval)
                        formData.append("profilePic",ival)
                        if(uval!=="" && evalue!=="" && cval!=="" &&ival!==""&&evalue.includes("@")!==false&& evalue.includes(".com")!==false)
                        {
                        await UpdateUser(uval,formData)
                            console.log(ival)
                            //console.log(user.profilePic)
                            history.push('/');
                        }
                        else{
                            setErrUStyle("block")
                            setErrEStyle("block")
                            setErrCStyle("block")
                            setErrIStyle("block")
                            setErrERegStyle("block")
                            setErrULenStyle("block")
                        }
    }} value="edit"/>
    </form>
    </div>)
    
};

export default Edit;