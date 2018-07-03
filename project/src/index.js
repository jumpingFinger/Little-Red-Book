/*BASE*/
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import {HashRouter,Redirect,Switch,Route} from 'react-router-dom';
import {Provider} from "react-redux"
import store from './store/index'
import axios from './api/index';
import md5 from 'blueimp-md5';

// antd
import {LocaleProvider} from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";

// CSS
import './static/css/reset.min.css';
import "./static/css/common.less";


//导入组公共组件
import  Header from "./component/Header";
import  Footer from "./component/Footer";
import Home from "./routes/Home";


import Login from "./routes/Login";
import Message from "./routes/Message";
import Person from "./routes/Person";
import Shopping from "./routes/Shoping";
render(<Provider store={store}>
    <HashRouter>
        <LocaleProvider locale={zh_CN}>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/home"  component={Home}/>
                <Route path="/person"  component={Person}/>
                <Route path="/message"  component={Message}/>
                <Route path='/shopping' component={Shopping}></Route>
            </Switch>
        </LocaleProvider>
    </HashRouter>
</Provider>,root);

