import { combineReducers } from "redux";

import userReducer from "../UserReducer";
import modalReducer from '../ModalReducer';

const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
});

export default rootReducer;