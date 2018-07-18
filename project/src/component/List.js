import React from 'react';
import {Icon} from "antd"
import {connect} from "react-redux";
import action from "../store/action";
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            isFirstLoad:true
        }
    }

    componentDidMount(){
        this.setState({ isFirstLoad:false});
    }

    // shouldComponentUpdate() {
    //     return this.state.isFirstLoad
    // }

    async changeLike(ev){
        ev.preventDefault();
        let {removeLike, addLike,queryMyLikes,type} = this.props;
        let target = ev.target,
            tagName = ev.tagName,
            nodeId = null;
            if (target && target.classList.contains('like')) {
                if (target.classList.contains('active1')) {
                    target.classList.remove('active1');
                    target.nextElementSibling.innerText--;
                    nodeId = target.dataset.value;
                    await removeLike({nodeId});
                    await queryMyLikes();
                    return;
                }
                nodeId = target.dataset.value;
                target.classList.add('active1');
                target.nextSibling.innerText++;
                await addLike({nodeId});
                await queryMyLikes();
            }
    }
    render() {
        let {data}=this.props;
        return (<div className={'recommendList'}>
            <ul className={'clearfix'} onClick={(ev)=>{
                this.changeLike(ev);
            }}>
                {
                    data.map((item,index)=>{
                        let {content,name,userImg,nodeImg,likes,nodeId}=item;
                        return(  <li key={index}>
                            <img
                                src={nodeImg[0]}
                                alt=""/>
                            <div className={'content'}>
                                {content}
                            </div>
                            <div className={'footer'}>
                                <div className={'left'}>
                                    <img
                                        src={userImg}
                                        alt="" className={'headPortrait'}/>
                                    <span className={'name'}>{name}</span>
                                </div>
                                <div className={'right'}>
                                    {/*{*/}
                                        {/*type==="myNode"? return()*/}
                                    {/*}*/}
                                    <Icon type="heart-o" className={'active1 like'} data-value={nodeId}/>
                                    <span>{likes.length}</span>
                                </div>
                            </div>
                        </li>)
                    })
                }
            </ul>
            </div>)
    }
}
export default connect(state => ({...state.person}),action.person)(List);