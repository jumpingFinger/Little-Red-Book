import React from 'react';
import {Icon} from "antd";
import Header from "../component/Header";
import List from "../component/List";
import {connect} from "react-redux";
import action from "../store/action";

class MyLikes extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            isFirstLoad:true
        }
    }

   async componentDidMount(){
        this.setState({isFirstLoad:false});
        let {personInfo:{likes},likeList,queryMyLikes}=this.props;
        if(likeList.length!==likes.length) {
            await queryMyLikes();
        }
    }
    // shouldComponentUpdate(){
    //     return this.state.isFirstLoad
    // }
    render(){
        let {personInfo:{likes},likeList}=this.props;
        if(likeList.length!==likes.length) return "";
        return <section className={'MyCollectionBox'}>
            <Header>
                <Icon type="left" className={'icon'} onClick={()=>{
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>所有收藏</span></h3>
            </Header>
            <div className={'ListContainer'}>
                    <List data={likeList} type={"myLikes"}/>
             </div>
        </section>
    }
}
export default connect(state =>({...state.person}),action.person)(MyLikes);