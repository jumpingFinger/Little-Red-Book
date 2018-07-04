import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import {Icon} from "antd";
import Header from "../component/Header";
import  "../static/css/settings.less";
import action from "../store/action/index";
class Settings extends React.Component{
    constructor(props,context){
        super(props,context);
        console.log(this.props);
    }

    render(){
        return <section className={'settingBox'}>
            <Header>
                <Icon type="left" className={'icon'} onClick={()=>{
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>设置</span></h3>
            </Header>
            <div className={'containerBox'}>
                <ul>
                    <li><span>个人资料</span><Icon type="right" className={'icon'}/></li>
                    <li><span>账号与安全</span><Icon type="right" className={'icon'}/></li>
                    <li><span>我赞过的</span><Icon type="right" className={'icon'}/></li>
                    <li><span>功能申请</span><Icon type="right" className={'icon'}/></li>
                </ul>
                <ul>
                    <li><span>隐私设置</span><Icon type="right" className={'icon'}/></li>
                    <li><span>新消息通知</span><Icon type="right" className={'icon'}/></li>
                    <li><span>清除缓存</span><Icon type="right" className={'icon'}/></li>
                </ul>
                <ul>
                    <li><span>鼓励一下</span><Icon type="right" className={'icon'}/></li>
                    <li><span>源于小红书</span><Icon type="right" className={'icon'}/></li>
                    <li><span>意见反馈</span><Icon type="right" className={'icon'}/></li>
                </ul>
            </div>
            <div className={'exit'}>登出账户</div>
        </section>
    }
}
export default connect(state=>({...state.more}),action.more)(Settings);