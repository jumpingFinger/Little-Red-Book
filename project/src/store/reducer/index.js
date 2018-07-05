import {combineReducers}  from "redux";
import home from "./home";
import person from "./person";
import more from "./more";


export default combineReducers({
    home,
    person,
    more
});