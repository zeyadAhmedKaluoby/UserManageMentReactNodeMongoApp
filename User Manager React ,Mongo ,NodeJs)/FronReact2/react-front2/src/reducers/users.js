export function users (state={},action){
    switch(action.type){
        case 'All_Users':{
            return {...state,usersList:action.payload}
        }
        case 'User_Details':{
            return {...state,userDetails:action.payload}
        }
        case 'clearDetails':{
            return {...state,userDetails:action.payload}
        }
        default:{
            return state;
        }
    }
}