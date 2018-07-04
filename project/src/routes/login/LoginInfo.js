import React from 'react';
import {Link} from 'react-router-dom'
import {Switch, Route, Redirect,withRouter} from "react-router-dom";
import {connect} from 'react-redux';


/*引入login.less*/
import "../../static/css/login.less";


class LoginInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }




    render() {
        return <Route>
            <div className="login">
                <h2>小蓝书</h2>
                <p>记录我的生活</p>
                <Link to="/login/land" exact className="land">登陆</Link>
                <Link to="/login/register"  exact className="register">注册</Link>
                <ul>
                    <li className="wx">
                        <a href="javascript:void 0;">
                            <img src={require('../../static/images/icon-wx.png')} alt=""/>
                            微信
                        </a>
                    </li>
                    <li className="qq">
                        <a href="javascript:void 0;">
                            <img src={require('../../static/images/icon-qq.png')} alt=""/>
                            QQ
                        </a>
                    </li>
                    <li className="weibo">
                        <a href="javascript:void 0;">
                            <img src={require('../../static/images/icon-weibo.png')} alt=""/>
                            微博
                        </a>
                    </li>
                    <li className="fb">
                        <a href="javascript:void 0;">
                            <img src={require('../../static/images/icon-facebook.png')} alt=""/>
                            facebook
                        </a>
                    </li>
                </ul>
                <Switch>
                    {/*<Route path='/login/pay'  component={Pay}/>*/}
                    {/*<Route path='/login/unpay'  component={Unpay}/>*/}
                </Switch>
                {/*这里是登录
                 <Link to="/home">
                 <button >点我跳转</button>
                 </Link>*/}
            </div>
        </Route>
    }
}
export default LoginInfo;