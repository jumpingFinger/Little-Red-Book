import React from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Redirect} from "react-router-dom";
import Footer from '../../component/Footer';
import Header from "../../component/Header";
import More from "../../routes/More";
import {Icon,Carousel } from 'antd';
import action from "../../store/action";
import "../../static/css/home.less";



const settings = {
    dots:false,
    slidesToShow: 1,
    //slidesToScroll: 1
};

class HomeNative extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isShow:this.props.moreIsShow,
            focus:0
        };
    }

    // componentWillMount(){
    //     if(typeof this.props.person ==="undefined"){
    //         this.props.queryPersonInfo();
    //     }
    // }
    //=>最后做优化
    //=>如果判断是从设置对回来的????????????????????
    componentDidMount(){
        //console.log(this.props.moreIsShow);
    }

    onChange=(focus)=>{
        this.setState({
            focus
        })
    };

    render(){

        return (<section className={'homeBox'}>
            <div>
                <Header>
                    <Icon type="menu-fold" className={'icon'} onClick={()=>{
                        this.props.changeMoreShow(true);
                    }}/>
                    <div className={'themeList clearfix' }>
                        {
                            ["关注","发现","附近"].map((item,index)=>{
                                return <span className={this.state.focus===index?"theme active":"theme"} key={index}>{item}</span>
                            })
                        }
                    </div>
                    <More/>
                </Header>
                <div className={'wrapper-switch'}>
                    <Carousel afterChange={this.onChange} dots={false}>
                        <div>
                            <ul className={"attentionBox"}>
                                <li>
                                    <div className="header">
                                             <span className={'headPortrait'}>
                                                    <img src="http://img3.imgtn.bdimg.com/it/u=927484518,1009241195&fm=27&gp=0.jpg" alt=""/>
                                             </span>
                                        <h4>金敏捷</h4>
                                    </div>
                                    <div className="imageList clearfix">
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                    </div>
                                    <div className={'notes'}>
                                        我真的很无语
                                        <br/>
                                        我真的很无语
                                    </div>
                                </li>
                                <li>
                                    <div className="header">
                                             <span className={'headPortrait'}>
                                                    <img src="http://img3.imgtn.bdimg.com/it/u=927484518,1009241195&fm=27&gp=0.jpg" alt=""/>
                                             </span>
                                        <h4>金敏捷</h4>
                                    </div>
                                    <div className="imageList clearfix">
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                    </div>
                                    <div className={'notes'}>
                                        我真的很无语
                                        <br/>
                                        我真的很无语
                                    </div>
                                </li>
                                <li>
                                    <div className="header">
                                             <span className={'headPortrait'}>
                                                    <img src="http://img3.imgtn.bdimg.com/it/u=927484518,1009241195&fm=27&gp=0.jpg" alt=""/>
                                             </span>
                                        <h4>金敏捷</h4>
                                    </div>
                                    <div className="imageList clearfix">
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                    </div>
                                    <div className={'notes'}>
                                        回上海找工作
                                        <br/>
                                        回上海找工作
                                    </div>
                                </li>
                                <li>
                                    <div className="header">
                                             <span className={'headPortrait'}>
                                                    <img src="http://img3.imgtn.bdimg.com/it/u=927484518,1009241195&fm=27&gp=0.jpg" alt=""/>
                                             </span>
                                        <h4>金敏捷</h4>
                                    </div>
                                    <div className="imageList clearfix">
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                        <img src="http://img3.imgtn.bdimg.com/it/u=2056714663,599564540&fm=27&gp=0.jpg" alt=""/>
                                    </div>
                                    <div className={'notes'}>
                                        回上海找工作
                                        <br/>
                                        回上海找工作
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul className={'navTitle'}>
                                <li>推荐</li>
                                <li>旅游</li>
                                <li>男士搭配</li>
                                <li>影视</li>
                                <li>护肤</li>
                                <li>美食</li>
                                <li>健身</li>
                                <li>明星</li>
                            </ul>
                        </div>
                        <div>

                        </div>
                    </Carousel>
                </div>
                <Footer></Footer>
            </div>
        </section>)
    }
}

export default connect(state=>({...state.more,...state.person}),{...action.person,...action.more})(HomeNative);