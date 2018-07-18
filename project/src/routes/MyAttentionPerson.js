import React from 'react';
import {connect} from 'react-redux';
import {Icon} from "antd";
import Header from "../component/Header";
import  "../static/css/myAttentionPerson.less";
import action from "../store/action/index";
class MyAttentionPerson extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state= {
            isChange: false,
            isFirstLoad:true
        }
    }

    async componentDidMount(){
        let {attentionPersonList,interestingList,queryAttentionPerson,queryInterestingPerson}=this.props;
        if(attentionPersonList.length===0 || interestingList){
            await queryAttentionPerson();
            await queryInterestingPerson();
        }
        this.setState({isFirstLoad:false});
    }

    componentDidUpdate(){
        this.setState({isFirstLoad:false});
    }

   async changePerson(){
        let {queryInterestingPerson}=this.props;
        this.setState({isChange:true,isFirstLoad:true});
        await queryInterestingPerson();
        this.setState({isChange:false});
    };
   async  isAttention(ev){
         let {removeAttention,addAttentionPerson,getAttentionInfo}=this.props;
        ev.preventDefault();
        let target=ev.target;
        let id=target.dataset.value;
        let tagName=target.tagName;
        if(tagName==="SPAN"){
            if(target.classList.contains("active1") && target.classList.contains("button")){
                console.log(1);
                target.classList.remove("active1");
                await removeAttention({id});
                await getAttentionInfo();
                return
            }
            console.log(2);
            target.classList.add("active1");
            await  addAttentionPerson({id});
            await getAttentionInfo();
        }
    }


    shouldComponentUpdate(){
       return this.state.isFirstLoad
    }
    //queryAttentionPerson,queryInterestingPerson,removeAttention,addAttentionPerson
    render(){
        let {personInfo,attentionPersonList,interestingList}=this.props;
        if(personInfo.follow.length!==attentionPersonList.length && attentionPersonList.length!==0 && interestingList.length!==0) return '';
        return <section className={'myAttentionPersonBox'}>
            <Header>
                <Icon type="left" className={'icon'} onClick={()=>{
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>我的关注用户</span></h3>
            </Header>
            <div className={'containerBox1'}>
                <div className={'interestingPerson'}>
                    <div className={"title"}>
                        <h4>你可能感兴趣的人</h4>
                        <span onClick={()=>{
                            this.changePerson();
                        }}>换一批</span>
                    </div>
                    <div className={'interestingList'}>
                        <ul>
                            {
                                interestingList.map((item,index)=>{
                                    let {id,userImg,bio,name}=item;
                                    return ( <li key={index}>
                                        <div className={"left"}>
                                            <img src={userImg} alt=""/>
                                            <div className={"nameBio"}>
                                                <span className={'name'}>{name}</span>
                                                <span className={'bio'}>{bio}</span>
                                            </div>
                                        </div>
                                        <div className={'right'}>
                                            <span className={'button'} data-value={id} onClick={(ev)=>{
                                                    this.isAttention(ev);
                                            }}>
                                                关注
                                            </span>
                                        </div>
                                    </li>)
                                })
                            }

                        </ul>
                    </div>
                </div>
               <div className={'hasAttentionPerson'}>
                   <h3>我关注的好友</h3>
                   <div className={'attentionList'}>
                       <ul>
                           {
                               attentionPersonList.map((item,index)=>{
                                   let {id,userImg,node,fens,name}=item;
                                   return ( <li key={index}>
                                       <div className={"left"}>
                                           <img src={userImg} alt=""/>
                                           <div className={"nameBio"}>
                                               <span className={'name'}>{name}</span>
                                               <div className={'nodeFens'}>
                                                   <span className={'node'}>{node.length}篇笔记</span>
                                                   <span className={"fens"} ref={"bb"}>{fens.length}粉丝</span>
                                               </div>
                                           </div>
                                       </div>
                                       <div className={'right'}>
                                           <span className={'button active1'} data-value={id} onClick={(ev)=>{
                                               this.isAttention(ev);
                                           }}>
                                               关注
                                           </span>
                                       </div>
                                   </li>)
                               })
                           }
                       </ul>
                   </div>
               </div>
            </div>
        </section>
    }
}
export default connect(state=>({...state.more,...state.person}),{...action.more,...action.person})(MyAttentionPerson);