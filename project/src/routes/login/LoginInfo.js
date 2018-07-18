import React from 'react';
import {Link} from 'react-router-dom';
import Zhanglei from "../../component/zhanglei/Zhanglei";

//less
import"../../static/css/Land.less"

/*引入login.less*/
import "../../static/css/login.less";

class LoginInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <div className="bgName" style={{height:document.documentElement.clientHeight+"px" , overflow:"hidden" ,}}>
            <div className="login" >
                <h2>小蓝书</h2>
                <p>记录我的生活</p>
                <Link to="/login/land"  className="land">登陆</Link>
                <Link to="/login/register"   className="register">注册</Link>
                <Zhanglei/>
            </div>
        </div>
    }
}
export default LoginInfo;