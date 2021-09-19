import { createStore } from "redux";

import rootReducer from "../Reducers/RootReducer";

const store = createStore(rootReducer);

export default store;