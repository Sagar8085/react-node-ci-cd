const initialState ={
    cart:{},
    user:{},
}
export default function RootReducer(state = initialState ,action){
    {
    switch(action.type)  
    {
        case "Add Cart":
        state.cart[action.payload[0]]= action.payload[1]
        return{cart:state.cart, user:state.user}
        
        case "Remove Cart":
         delete state.cart[action.payload[0]]
    
        case "Add User":
            state.user[action.payload[0]]= action.payload[1]
            return{cart:state.cart,user:state.user}
        
        default:
            return{cart:state.cart,user:state.user}
    }  
    }

}