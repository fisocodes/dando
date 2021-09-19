function userReducer(state = 0, action){
    switch (action.type) {
        case 'user/setUser':
                if(action.payload)
                    return action.payload;
            break;
        case 'user/setNull':
                return  null;
        default:
            return state;
    }

}

export default userReducer;