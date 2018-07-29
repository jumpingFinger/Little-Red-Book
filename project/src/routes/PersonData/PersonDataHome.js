import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {Icon} from "antd";
import Header from "../../component/Header";
import  "../../static/css/personalData.less";
import action from "../../store/action/index";
import SexSelect from "../../routes/SexSelect";
class PersonalDataHome extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isSexShow:false,
        }

    }
   async componentDidMount(){
        let {personInfo,queryPersonInfo} = this.props;
       console.log(personInfo.id === 0);
        if (personInfo && personInfo.id === 0) {
          await queryPersonInfo();
        }
    }
    changeSexSHow=()=>{
        this.setState({isSexShow:false})
    };

    render(){
        let {personInfo}=this.props;
        console.log(personInfo.id === 0);
        if(personInfo.id===0) return '';
        let {name,userImg,bio,id,sex,birth}=personInfo;
        return <section>
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
                        <img src={userImg} alt=""/>
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
                            <li>{name}
                                <Link to={'/personalData/rename'}>
                                    <Icon type="right" className={'icon'} />
                                </Link>
                            </li>
                            <li>
                                {id}
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li className={'dark'}>
                                未认证,认证信息仅自己可见
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li>
                                {
                                    sex===0?"男性":"女性"
                                }
                                <Icon type="right"  className={'icon'} onClick={()=>{
                                    this.setState({isSexShow:true})
                                }}/>
                            </li>
                            <li>
                                安道尔
                                <Icon type="right"  className={'icon'}/>
                            </li>
                            <li>
                                {birth}
                                <Link to={'/personalData/birthday'}>
                                    <Icon type="right"  className={'icon'}/>
                                </Link>
                            </li>
                            <li className={'sign dark'}>
                                {
                                    bio.length>=1?bio: '未填写'

                                }
                                <Link to={'/personalData/bio'}>
                                   <Icon type="right"  className={'icon icon1'}/>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <p className={'moreMessage'}>
                    更多信息(仅自己可见,用于优化你的推荐结果)
                </p>
            </div>
            <SexSelect isSexShow={this.state.isSexShow} changeSexSHow={this.changeSexSHow}/>
        </section>
    }
}
export default connect(state=>({...state.more,...state.person}),{...action.more,...action.person})(PersonalDataHome);