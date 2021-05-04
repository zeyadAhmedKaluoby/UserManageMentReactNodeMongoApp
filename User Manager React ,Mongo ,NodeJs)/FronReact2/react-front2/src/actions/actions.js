export async  function GetAllUsers(){
    let payload=[];
    await  fetch(`http://localhost:5000/api/users`).then(res=>{
            return res.json();    
    }).then((data)=>{
        payload=data.users;
        console.log(payload)
    });
    return {
        type:"All_Users",
        payload
    }
}  
export async function AddUser(obj){
  await  fetch(`http://localhost:5000/api/users/register`,{method:'POST',
        body:obj}).then(res => res.json())}

        
export async function GetUserDetails(userName){
    let payload= null;
    let response = await fetch(`http://localhost:5000/api/users/${userName}`);
    let data = await response.json()
    payload=data.user
   
    return{
        type:"User_Details",
        payload
    }
}
export function clearUserDetails() {
    return{
        type:'clearDetails',
        payload:null
    }
}

export async function DeleteUser(id){
   await fetch(`http://localhost:5000/api/users/${id}`,{method:'DELETE'})
    
}

export async function UpdateUser(username,obj){
    console.log(obj)
    console.log(obj.profilePic)
    await fetch(`http://localhost:5000/api/users/edit/${username}`,{method:'POST',
    body:obj}).then(res => res.json())
}