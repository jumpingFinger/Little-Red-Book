import React from 'react';
import {connect} from "react-redux";
import {withRouter,Link} from "react-router-dom";
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
    }
    componentDidMount(){
        //console.log(this.refs.bb.refs.aa);
    }

    render(){
        let {personInfo:{draft}}=this.props;
        return <div>
            <Transition in={this.props.moreIsShow} timeout={duration} onEnter={(node)=>{
                node.style.display='block'
            }} onExit={(node)=>{
                node.style.display='none'
            }} ref={'bb'}>
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
                                        <li onClick={ async(ev)=>{
                                            ev.preventDefault();
                                            await this.props.changeMoreShow(false);
                                            this.props.history.push('/myAttentionPerson');
                                        }}>
                                            <i><Icon type="eye-o" /></i>
                                            <span>我的关注</span>
                                        </li>
                                        <li onClick={ async(ev)=>{
                                            ev.preventDefault();
                                            await this.props.changeMoreShow(false);
                                            this.props.history.push('/myLikes');
                                        }}>
                                            <i><Icon type="star-o" /></i>
                                            <span>我的收藏</span>
                                        </li>

                                        <li onClick={ async(ev)=>{
                                            ev.preventDefault();
                                            await this.props.changeMoreShow(false);
                                            this.props.history.push('/myDraft');
                                        }}>
                                            <i><Icon type="folder" /></i>
                                            <span>我的草稿</span>
                                            <span className={'number'}>
                                          {draft.length===0?"":draft.length}
                                          </span>
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
                                        <li onClick={async(ev)=>{
                                            //=>心得
                                            ev.preventDefault();
                                            await this.props.changeMoreShow(false);
                                            this.props.history.push('/settings');
                                        }}>
                                            <i><Icon type="setting" /></i>
                                            <span >设置</span>
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
export default withRouter(connect(state=>({...state.more,...state.person}),action.more)(More));





