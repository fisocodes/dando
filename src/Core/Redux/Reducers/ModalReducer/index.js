function modalReducer(state = {message: 'No message', isOpen: true}, action){
    switch (action.type) {
        case 'modal/setMessage':
                if(action.payload)
                    return {message: action.payload, isOpen: state.isOpen};
            break;
        case 'modal/setIsOpen':
                return  {message: state.message, isOpen: action.payload};
        default:
            return state;
    }

}

export default modalReducer;