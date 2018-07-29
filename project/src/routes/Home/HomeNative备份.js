import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from "react-router-dom";
import Footer from '../../component/Footer';
import Header from "../../component/Header";
import More from "../../routes/More";
import {Icon, Carousel} from 'antd';
import action from "../../store/action";
import "../../static/css/home样式备份.less";
import Swiper from 'swiper/dist/js/swiper';
import 'swiper/dist/css/swiper.css';
import home from "../../store/action/home";

function getDate(time) {
    let nowDate = new Date();
    let newTime = nowDate.getTime();
    let date = new Date(time);
    let oldTime = date.getTime();
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes();

    if (newTime - oldTime < 1000 * 60 * 60 * 24) {
        return `今天 ${h}${m}`
    } else if (newTime - oldTime < 1000 * 60 * 60 * 24 * 2) {
        return `昨天 ${h}${m}`
    }
    return M + D + h + m;
}

const settings = {
    dots:false,
    slidesToShow: 1,
    //slidesToScroll: 1
};

class HomeNative extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShow: this.props.moreIsShow,
            focus: 0,
            isChange:false,
            isFirstLoad:true,
            likes:0,
            collect:0,
        };
    }

    async componentDidMount() {
        let {attentionInfo, getAttentionInfo} = this.props;
        if (attentionInfo.length === 0) {
            await getAttentionInfo();
        }
    }

    async  handleEvent(ev) {
        ev.preventDefault();
        let {isChange}=this.state;
        let {addcollect, removeLike, removecollect, addLike} = this.props;
        let target = ev.target,
            tagName = ev.tagName,
            nodeId = null;
        if(!isChange) {
            if (target && target.classList.contains('like')) {
                if (target.classList.contains('active1')) {
                    await this.setState({isChange:true});
                    target.classList.remove('active1');
                    target.nextSibling.innerText--;
                    nodeId = target.dataset.value;
                    await removeLike({nodeId});
                    await this.setState({isChange:false});
                    return;
                }
                await   this.setState({isChange:true});
                nodeId = target.dataset.value;
                target.classList.add('active1');
                target.nextSibling.innerText++;
                await addLike({nodeId});
                await this.setState({isChange:false});
                return;
            }
            if (target && target.classList.contains('collect')) {
                if (target.classList.contains('active1')) {
                    await   this.setState({isChange:true});
                    nodeId = target.dataset.value;
                    target.classList.remove('active1');
                    target.nextSibling.innerText--;
                    await   removecollect({nodeId});
                    await  this.setState({isChange:false});
                    return;
                }
                await this.setState({isChange:true});
                nodeId = target.dataset.value;
                target.classList.add('active1');
                target.nextSibling.innerText++;
                await   addcollect({nodeId});
                await this.setState({isChange:false});
                return;
            }
        }
    };

    onChange=(focus)=>{
       this.setState({focus});
       this.refs.Carousel.slick.slickGoTo(focus);
    };

    render(){
        let {attentionInfo, personInfo: {id, node}, updateHome} = this.props;
        if (attentionInfo.length === 0) return '';
        return (<section className={'homeBox'}>
            <div>
                <Header>
                    <Icon type="menu-fold" className={'icon'} onClick={() => {
                        this.props.changeMoreShow(true);
                    }}/>
                    <div className={'themeList clearfix'}>
                        {
                            ["关注", "发现", "附近"].map((item, index) => {
                                return <span className={this.state.focus === index ? "theme active" : "theme"}
                                             key={index} onClick={this.onChange.bind(null, index)}>{item}</span>
                            })
                        }
                    </div>
                    <More/>
                </Header>
                <div className={'bannerBox'}>
                    <div className={'wrapper-switch'}>
                        <Carousel afterChange={this.onChange} dots={false}  ref={'Carousel'}>
                            <div>
                                <ul className={"attentionBox"} onClick={(ev) => {
                                    this.handleEvent(ev);
                                }}>
                                    {
                                        attentionInfo.map((item, index) => {
                                            let {content, likes, collect, time, nodeImg, name, userImg, nodeId} = item;
                                            time = getDate(time);
                                            return (<li key={index}>
                                                <div className="header">
                                             <span className={'headPortrait'}>
                                                    <img
                                                        src={userImg}
                                                        alt=""/>
                                             </span>
                                                    <div className={'headerInfo'}>
                                                        <h4>{name}</h4>
                                                        <span className={'time'}>{time}</span>
                                                    </div>
                                                </div>
                                                <div className={`imageList${nodeImg.length} clearfix`}>
                                                    {
                                                        nodeImg.map((item, index) => {
                                                            let a = Math.random();
                                                            return (<img
                                                                key={a}
                                                                src={item}
                                                                alt=""/>)
                                                        })
                                                    }
                                                </div>
                                                <div className={'notes'}>{content}</div>
                                                <div className={'commentBox'}>
                                                    <div className={'detailsComment'}>
                                                        <div className={"likeBox"}>
                                                            <Icon type="heart-o" className={
                                                                likes.find((item) => item === id) ? "active1 like" : "like"
                                                            } data-value={nodeId}/>
                                                            <span className={"text"}>{likes.length}</span>
                                                        </div>
                                                    </div>
                                                    <div className={'detailsComment'}>
                                                        <Icon type="message"/>
                                                        <span>66</span>
                                                    </div>
                                                    <div className={'detailsComment'}>
                                                        <div className={'collectBox'}>
                                                            <Icon type="star-o" className={
                                                                collect.find(item => item === id) ? "active1 collect" : "collect"
                                                            } data-value={nodeId}/>
                                                            <span className={'text'}>{collect.length}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>)
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <div className={"discoverBox"}>
                                    <ul className={'navTitle'}>
                                        <li>推荐</li>
                                        <li>旅游</li>
                                        <li>男士</li>
                                        <li>影视</li>
                                        <li>护肤</li>
                                        <li>美食</li>
                                        <li>健身</li>
                                        <li>明星</li>
                                    </ul>
                                    <div className={'recommendList'}>
                                        <ul className={'clearfix'}>
                                            <li>
                                                <img
                                                    src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg"
                                                    alt=""/>
                                                <div className={'content'}>
                                                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                                                </div>
                                                <div className={'footer'}>
                                                    <div className={'left'}>
                                                        <img
                                                            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg"
                                                            alt="" className={'headPortrait'}/>
                                                        <span className={'name'}>星辰</span>
                                                    </div>
                                                    <div className={'right'}>
                                                        <Icon type="heart-o"/>
                                                        <span>88</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <img
                                                    src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg"
                                                    alt=""/>
                                                <div className={'content'}>
                                                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                                                </div>
                                                <div className={'footer'}>
                                                    <div className={'left'}>
                                                        <img
                                                            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg"
                                                            alt="" className={'headPortrait'}/>
                                                        <span className={'name'}>星辰</span>
                                                    </div>
                                                    <div className={'right'}>
                                                        <Icon type="heart-o"/>
                                                        <span>88</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <img
                                                    src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg"
                                                    alt=""/>
                                                <div className={'content'}>
                                                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                                                </div>
                                                <div className={'footer'}>
                                                    <div className={'left'}>
                                                        <img
                                                            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg"
                                                            alt="" className={'headPortrait'}/>
                                                        <span className={'name'}>星辰</span>
                                                    </div>
                                                    <div className={'right'}>
                                                        <Icon type="heart-o"/>
                                                        <span>88</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <img
                                                    src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg"
                                                    alt=""/>
                                                <div className={'content'}>
                                                    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                                                </div>
                                                <div className={'footer'}>
                                                    <div className={'left'}>
                                                        <img
                                                            src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1530785812&di=314f41e1b3c1e6827a51090941f4d904&src=http://img3.duitang.com/uploads/item/201409/17/20140917223742_GKzJR.jpeg"
                                                            alt="" className={'headPortrait'}/>
                                                        <span className={'name'}>星辰</span>
                                                    </div>
                                                    <div className={'right'}>
                                                        <Icon type="heart-o"/>
                                                        <span>88</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </Carousel>
                    </div>
                </div>
                <Footer/>
            </div>
        </section>)
    }
}

export default connect(state=>({...state.more,...state.person}),{...action.person,...action.more})(HomeNative);