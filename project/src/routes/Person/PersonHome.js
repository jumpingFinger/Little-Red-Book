import React from 'react';
import {connect} from 'react-redux';
import Footer from '../../component/Footer';
import Header from "../../component/Header";
import More from "../../routes/More";
import {Icon} from 'antd';
import "../../static/css/person.less";
import action from "../../store/action/index";


const settings = {
    dots: false,
    slidesToShow: 1,
};

class PersonHome extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShow: this.props.moreIsShow,
        };
    }

    render() {
        let headerStyle={
            background:'rgba(0,0,0,0)',
            borderBottom:0
        };

        return (<section className={'personBox'}>
            <div>
                <Header headerStyle={headerStyle}>
                    <Icon type="menu-fold" className={'icon'} onClick={() => {
                        this.props.changeMoreShow(true);
                    }}/>
                    <More/>
                </Header>

                <div className={'container'}>
                    <div className={'infoShow'}>
                        <div className="headPortrait">
                            <img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg" alt=""/>
                        </div>
                        <span>星辰</span>
                        <div className={'vip'}>
                            <em>成为黑卡会员</em>
                        </div>
                        <ul>
                            <li>
                                <span className={'number'}>1</span>
                                <span className={'title'}>关注</span>
                            </li>
                            <li>
                                <span className={'number'}>0</span>
                                <span className={'title'}>粉丝</span>
                            </li>
                            <li>
                                <span className={'number'}>0</span>
                                <span className={'title'}>获赞与收藏</span>
                            </li>
                        </ul>
                    </div>
                    <div className={'redact'}>
                        <div className={'write'}>
                            <span onClick={()=>{
                                this.props.history.push('/personalData');
                            }}>编辑个人资料</span>
                        </div>
                        <ul className={'geographical'}>
                            <li>
                                <span><Icon type="environment-o" className={'icon'}/></span>
                                <p>完善你的位置信息</p>
                            </li>
                            <li>
                                <Icon type="rocket" className={'icon'}/>
                                <p>社区等级:升级规则</p>
                            </li>
                        </ul>
                        <div className={'describe'}>
                            添加个人描述,可以让大家更好地认识你
                        </div>
                    </div>
                    <div className={'note'}>
                        <div className={'title'}>
                            <h4>笔记*1</h4>
                            <h4>专辑*1</h4>
                        </div>
                        <div className={'detail'}>
                            这里是内容
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        </section>)
    }
}

export default connect(state => ({...state.more}), action.more)(PersonHome);