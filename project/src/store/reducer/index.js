import {combineReducers}  from "redux";
import home from "./home";
import person from "./person";
import more from "./more";
import shop from "./shopping"


export default combineReducers({
    home,
    person,
    more,
    shop
});