import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import {Icon} from "antd";
import Header from "../component/Header";
import  "../static/css/personalData.less";
import action from "../store/action/index";
class PersonalData extends React.Component{
    constructor(props,context){
        super(props,context);
        console.log(this.props);
    }

    render(){
        return <section className={'personalDataBox'}>
            <Header>
                <Icon type="left" className={'icon'} onClick={()=>{
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>个人资料</span></h3>
            </Header>
            <div className={'containerBox'}>
               <h3 className={'title'}>个人资料</h3>
                <div className={'basicInfo'}>
                    <div className="Icon">
                        <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg" alt=""/>
                        <span>修改头像</span>
                    </div>
                    <div className={'infoDetail clearfix'}>
                        <ul className={'infoTitle'}>
                            <li>修改名字</li>
                            <li>小红书ID</li>
                            <li>实名认证</li>
                            <li>性别</li>
                            <li>常住地</li>
                            <li>生日</li>
                            <li className={'sign'}>个性签名</li>
                        </ul>
                        <ul className={'infoCompile'}>
                            <li>星辰
                                <Icon type="right" className={'icon'}/>
                            </li>
                            <li>
                                45645612112313456794
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li className={'dark'}>
                                未认证,认证信息仅自己可见
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li>
                                男性
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li>
                                安道尔
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li>
                                1995-07-02
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li className={'sign dark'}>
                                未填写
                                <Icon type="right"  className={'icon icon1'}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    }
}
export default connect(state=>({...state.more}),action.more)(PersonalData);