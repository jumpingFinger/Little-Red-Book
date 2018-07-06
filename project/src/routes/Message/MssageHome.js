import React from 'react';
import {connect} from 'react-redux';
import Footer from '../../component/Footer';
import Header from "../../component/Header";
import More from "../../routes/More";
import {Icon} from 'antd';
import "../../static/css/message.less";
import action from "../../store/action/index";


const settings = {
    dots: false,
    slidesToShow: 1,
    //slidesToScroll: 1
};

class MssageHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShow: this.props.moreIsShow,
            focus: 0
        };
    }

    render() {

        return (<section className={'MessageBox'}>
            <div>
                <Header>
                    <Icon type="menu-fold" className={'icon'} onClick={() => {
                        this.props.changeMoreShow(true);
                    }}/>
                    <h3 className={'title'}><span>消息</span></h3>
                    <More/>
                </Header>

                <div className={'containerBox'}>
                    <div className={'confirm'}>
                        <h4>打开推送通知</h4>
                        <p>以免错过订单发送,活动福利,互动消息</p>
                        <div className={"startJump"}>开启</div>
                    </div>
                    <div className={'newMessage'}>
                        <ul>
                            <li>
                                <span className={'heart'}>
                                    <Icon type="heart-o"/>
                                </span>
                                <p>收到的赞和收藏</p>
                                <Icon type="right" className={'icon'}/>
                            </li>
                            <li>
                                <span className={'message'}>
                                    <Icon type="message"/>
                                </span>
                                <p>收到的评论和@</p>
                                <Icon type="right" className={'icon'}/>
                            </li>
                            <li>
                                <span className={'user'}>
                                   <Icon type="user"/>
                                </span>
                                <p>新增关注</p>
                                <Icon type="right" className={'icon'}/>
                            </li>
                            <li>
                                <span className={'bulb'}>
                                    <Icon type="bulb"/>
                                </span>
                                <p>通知消息</p>
                                <Icon type="right" className={'icon'}/>
                            </li>
                        </ul>
                    </div>
                    <div className={'privateLetter'}>
                        <div className={'container'}>
                             <span>
                                 <Icon type="message"/>
                             </span>
                            <p>私信</p>
                            <Icon type="right" className={'icon'}/>
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        </section>)
    }
}

export default connect(state => ({...state.more}), action.more)(MssageHome);