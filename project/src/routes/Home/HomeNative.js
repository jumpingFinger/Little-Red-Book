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

    //=>最后做优化
    //=>如果判断是从设置对回来的????????????????????
    componentDidMount(){
        console.log(this.props.moreIsShow);
    }

   onChange=(focus)=>{
        this.setState({
            focus
        })
   };

aa=(index)=>{
    console.log(index);
}

    render(){

        return (<section >
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
                        {/*<span className={'theme'}>关注</span>*/}
                        {/*<span className={'theme'}>发现</span>*/}
                        {/*<span className={'theme'}>附近</span>*/}
                    </div>
                    <More/>
                </Header>

                <div className={'wrapper-switch'}>
                    <Carousel afterChange={this.onChange} dots={false} slidesToShow={this.state.focus}  {...settings} goTo={this.aa}>
                        <div>

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
                                <li>时尚</li>
                                <li>家居</li>
                                <li>音乐</li>
                                <li>数码</li>
                                <li>母音</li>

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
export default connect(state=>({...state.more}),action.more)(HomeNative);