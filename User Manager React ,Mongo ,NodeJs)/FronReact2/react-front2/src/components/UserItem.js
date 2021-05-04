import { Link } from "react-router-dom";
const UserItem = ({us}) => {
    if(us)
    return (
        (<li className="list-group-item  mt-5 rounded-right text-center" style={{width:404}}>
                    <Link className="btn nav-link " to={`/UserDetails/${us.username}`} >
                        <div style={{overflow:"hidden",height:200,borderTopRightRadius:40}}>
                <img className="imgTrans"  style={{width:328,height:200,objectFit:"cover" ,backgroundPosition:"center",}} src={`http://localhost:5000/${us.profilePic}`}/>
                </div>
            <div className="bg-warning flex-column p-5 text-center" style={{borderBottomLeftRadius:40}}>

                <div>
                <h2>{us.username}</h2>
                <h3>{us.email}</h3>
                <h3>{us.city}</h3>
                </div>
            </div>
            </Link>
    </li>)
    )
}
export default UserItem