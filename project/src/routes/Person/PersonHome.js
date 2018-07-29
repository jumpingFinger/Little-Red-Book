import React from 'react';
import {connect} from 'react-redux';
import Footer from '../../component/Footer';
import Header from "../../component/Header";
import More from "../../routes/More";
import {Icon} from 'antd';
import "../../static/css/person.less";
import action from "../../store/action/index";
import {withRouter} from "react-router-dom";
import  List from "../../component/List";

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

    componentWillUnmount() {
        // if (this.swiperID) { // 销毁swiper
        //     this.swiperID.destroy()
        // }
       // console.log(" person 销毁");
    }

   async componentDidMount(){
       let {personInfo,queryPersonInfo,queryMyNode,nodeList} = this.props;
       console.log(personInfo.id === 0,personInfo.id);
       if (personInfo && personInfo.id === 0) {
         await queryPersonInfo();
         await queryMyNode();
       }else if(personInfo.node.length !== nodeList.length){
           await queryMyNode();
       }

       console.log("person didmout");
   }
    render() {
        let {personInfo,nodeList}=this.props;
        console.log( personInfo.node.length !== nodeList.length,personInfo.node.length,nodeList.length);
        if(personInfo.id===0 || personInfo.node.length !== nodeList.length) return "";
        let {name,userImg,follow,fens,bio,likes,collect,node}=personInfo;
        let headerStyle={
            background:'rgba(0,0,0,0)',
            borderBottom:0
        };
        nodeList.forEach(item=>{
            item.name=name;
            item.userImg=userImg;
        });
        return (<section className={'personBox'}>
            <div>
                <Header headerStyle={headerStyle}>
                    <Icon type="menu-fold" style={{color:"#fff"}} className={'icon'} onClick={() => {
                        this.props.changeMoreShow(true);
                    }}/>
                    <More/>
                </Header>

                <div className={'container'}>
                    <div className={'infoShow'}>
                        <div className="headPortrait">
                            <img src={userImg} alt=""/>
                        </div>
                        <span>{name}</span>
                        <div className={'vip'}>
                            <em>成为黑卡会员</em>
                        </div>
                        <ul>
                            <li>
                                <span className={'number'}>{follow.length}</span>
                                <span className={'title'}>关注</span>
                            </li>
                            <li>
                                <span className={'number'}>{fens.length}</span>
                                <span className={'title'}>粉丝</span>
                            </li>
                            <li>
                                <span className={'number'}>{likes.length+collect.length}</span>
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
                            {
                                bio.length>=1?bio: '添加个人描述,可以让大家更好地认识你'
                            }
                        </div>
                    </div>
                    <div className={'note'}>
                        <div className={'title'}>
                            <h4>笔记*{node.length}</h4>
                            <h4>专辑*{collect.length}</h4>
                        </div>
                        <div className={'detail'}>
                            <List data={nodeList} type={"myNode"}/>
                        </div>
                    </div>
                    <div className={'maskLayer'}/>
                </div>
                <Footer/>
            </div>
        </section>)
    }
}
export default withRouter(connect(state => ({...state.more,...state.person}), {...action.more,...action.person})(PersonHome));