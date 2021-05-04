import {Modal,Button} from 'react-bootstrap'
import React,{useEffect, useState} from 'react';
import {Link, Redirect, useHistory, useParams} from 'react-router-dom'
import { DeleteUser, GetUserDetails } from '../actions/actions';


const UserDetails=()=>{
    const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
    let history=useHistory()

    const p = useParams().username;
    const [loadedUsers,setLoadedUsers]=useState([]);
    useEffect(async () => {
        try {
            
            setLoadedUsers((await GetUserDetails(p)).payload)

        } catch (err) {
            console.log(err)
        }
    }, [])
    return (
    <div className="  text-center  mt-5 col-12 " >
        <div className="row offset-lg-1 offset-md-0">
            <div className="col-lg-5 col-md-12  bg-warning">
        <h1 className="text-dark  " style={{marginTop:  100}}>Username: {loadedUsers.username}</h1>
        <h3>Email: {loadedUsers.email}</h3>
        <h3>City: {loadedUsers.city}</h3>
        </div>
        <div className="col-lg-4 col-md-12  p-0 " >
        <img className="col-lg-12  p-0" style={{borderBottomRightRadius:40}} src={`http://localhost:5000/${loadedUsers.profilePic}`}/>
        </div>
        
        <div className=" col-lg-2 col-md-6 mt-4">
        
        <button className="btn btn-danger col-10 mt-5" onClick={ ()=>{
            handleShow()
            }}>Delete</button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are sure to delete this user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button va variant="primary" onClick={()=>{
                    DeleteUser(p);
                    history.push('/')}}>Delete</Button>
        </Modal.Footer>
      </Modal>
            <button className="btn btn-success  col-10  mt-2"><Link className="nav-link btn text-white" to={`/Edit/${loadedUsers.username}`}>Edit</Link></button>
            </div>
            </div>
    </div>)

    }

export default UserDetails;