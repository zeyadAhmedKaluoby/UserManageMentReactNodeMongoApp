import { useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserItem from '../components/UserItem'
import { GetAllUsers } from "../actions/actions";
const UserList= ()=>{
 const dispatch = useDispatch();
 const [searchTerm,setSearchTerm]=useState('')
 var usersList = useSelector((state) =>state.users.usersList);
  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);
  
  let renderUsers = () => {
    if (usersList && usersList.length) {
      return(
        <div className="col-12">
    <input type="text" id="inp" placeholder="Search by Username" className="form-control  ml-auto mr-auto mt-5" style={{width:500}} onChange={event=>
            {setSearchTerm(event.target.value)
                console.log(searchTerm)
            }
            }/>
          <ul className="row " >
         {usersList.filter(val=>{
            if(searchTerm=="")
            {
                return val}
            else if(val.username.toLowerCase().includes(searchTerm.toLowerCase()))
            {
                console.log(searchTerm)

                return val;
            }
        }).map((user) => <UserItem key={user.username} us={user}/>)}
         </ul> </div>
          );
    }
    return <p>No users</p>;
  };
  return <div>{renderUsers()}</div>;

}
export default UserList;
