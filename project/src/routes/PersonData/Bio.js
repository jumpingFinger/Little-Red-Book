import React from 'react';
import {connect} from 'react-redux';
import {Input,Icon} from "antd";
import Header from "../../component/Header";
/*import  "../../static/css/personalData.less";*/
import action from "../../store/action/index";
class PersonalRename extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            bio:''
        }
    }

    componentWillMount(){
        let {personInfo:{bio}} =this.props;
        this.setState({
            bio
        })
    }
    async handleDone(ev){
        ev.preventDefault();
        if(this.state.bio.length===0){
            this.props.history.goBack();
            return;
        }
        await this.props.reviseBaseInfo({
            type:"bio",
            value:this.state.bio
        });
        this.props.history.goBack();
    }

    handleChange=(ev)=>{
        let bio=ev.target.value,
            matchWords=88;
        if(bio.length>matchWords)return;
        this.setState({bio})
    };
    render(){
        const { TextArea } = Input;
      //  let {personInfo:{bio}} =this.props;
        let {bio}=this.state;
        return <section >
            <Header>
                <Icon type="left" className={'icon'} onClick={(ev)=>{
                    ev.preventDefault();
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>个性签名</span></h3>
                <div className={'done'} onClick={this.handleDone.bind(this)}>完成</div>
            </Header>
            <div className={'renameContainer'}>
                <p>有趣的个人介绍会吸引更多粉丝哦</p>
                <TextArea   rows={4} defaultValue={bio} onChange={this.handleChange}  maxLength="88"/>
                <div className={'wordCount'}>{
                    bio?88-bio.length:88
                }</div>
            </div>
        </section>
    }
}
export default connect(state=>({...state.person}),{...action.person})(PersonalRename);