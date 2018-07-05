import React from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import "../static/css/more.less";
import {Icon} from "antd";
import Transition from 'react-transition-group/Transition';
import action from "../store/action";

const duration = 400;
const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    display:'none'

};
const transitionStyles = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
};

class More extends React.Component{
    constructor(props,context){
        super(props,context);
        // this.state= {
        //     isShow: this.props.moreIsShow
        // }
    }

    //=>真是看不懂 (不知道为啥)
    // componentWillReceiveProps(){
    //     console.log(this.props.moreIsShow);
    //     this.setState({
    //         isShow:this.props.moreIsShow
    //     })
    // }
    // componentWillUpdate(){
    //     console.log(this.props.moreIsShow);
    // }
    //为啥
    // componentDidUpdate(){
    //     //console.log(this.props.moreIsShow);
    //         this.setState({
    //             isShow:this.props.moreIsShow
    //         })
    // }

    render(){
        console.log(this.props.moreIsShow);
        return <div>
            <Transition in={this.props.moreIsShow} timeout={duration} onEnter={(node)=>{
                node.style.display='block'
            }} onExit={(node)=>{
                node.style.display='none'
            }}>
                {
                    (state)=>(
                        <div className={'moreBox'} style={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }} onClick={(ev)=>{
                           let target=ev.target;
                            if(target.classList.contains('moreBox')){
                                this.props.changeMoreShow(false);
                            }
                        }}>
                            <div className={'moreList'}>
                                <h3>更多</h3>
                                <div className={'containerList'}>
                                    <ul>
                                        <li>
                                            <i><Icon type="eye-o" /></i>
                                            <span>我的关注</span>
                                        </li>
                                        <li>
                                            <i><Icon type="star-o" /></i>
                                            <span>我的收藏</span>
                                        </li>
                                        <li>
                                            <i><Icon type="folder" /></i>
                                            <span>我的草稿</span>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <i><Icon type="shopping-cart" /></i>
                                            <span>购物车</span>
                                        </li>
                                        <li>
                                            <i><Icon type="database" /></i>
                                            <span>订单</span>
                                        </li>
                                        <li>
                                            <i><Icon type="gift" /></i>
                                            <span>薯券</span>
                                        </li>
                                        <li>
                                            <i><Icon type="shop" /></i>
                                            <span>心愿单</span>
                                        </li>
                                        <li>
                                            <i><Icon type="red-envelope" /></i>
                                            <span>黑卡会员</span>
                                        </li>
                                    </ul>
                                    <ul>
                                        <li>
                                            <i><Icon type="phone" /></i>
                                            <span>客服中心</span>
                                        </li>
                                        <li>
                                            <i><Icon type="setting" /></i>
                                            <span onClick={()=>{
                                                //=>心得
                                                this.props.changeMoreShow(false);
                                                this.props.history.push('/settings');
                                            }}>设置</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Transition>
        </div>
    }
}
export default withRouter(connect(state=>({...state.more}),action.more)(More));





