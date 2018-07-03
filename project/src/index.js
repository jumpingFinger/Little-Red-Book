/*
/!*BASE*!/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter, Redirect, Switch, Route} from 'react-router-dom';
import {Provider} from "react-redux"
import store from './store/index'
import axios from './api/index';
import md5 from 'blueimp-md5';

// antd
import {LocaleProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

// import CSS
import './static/css/reset.min.css';
import "./static/css/common.less";


//导入组公共组件
// import  Header from "./component/Header";
// import  Footer from "./component/Footer";
// import Home from "./routes/Home";
// import Mycourse from "./routes/Mycourse";
// import Person from "./routes/Person";

render( < Provider
store = {store} >
    < HashRouter >
    < LocaleProvider
locale = {zh_CN} >
    < div >


    < / div >
    < / LocaleProvider >
    < / HashRouter >
    < / Provider >, root
)
;
*/
