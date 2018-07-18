import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Input,Icon} from "antd";
import Header from "../../component/Header";
/*import  "../../static/css/personalData.less";*/
import action from "../../store/action/index";
class PersonalRename extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            value:''
        }
    }

   async handleDone(ev){
        ev.preventDefault();
        if(this.state.value.length===0){
            this.props.history.goBack();
            return;
        }
      await this.props.reviseBaseInfo({
            type:"name",
            value:this.state.value
        });
       this.props.history.goBack();
    }
    render(){
        let {personInfo:{name}} =this.props;
        return <section>
            <Header>
                <Icon type="left" className={'icon'} onClick={(ev)=>{
                    ev.preventDefault();
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>修改名字</span></h3>
                <div className={'done'} onClick={this.handleDone.bind(this)}>完成</div>
            </Header>
            <div className={'renameContainer'}>
                <p>2-24个字符,一个月只能申请修改一次</p>
                {/*<input type="text" value={"星辰"} placeholder={"星辰"}/>*/}
                <Input placeholder={name} onBlur={(ev)=>{
                    let value=ev.target.value;
                    this.setState({
                        value
                    })
                }}/>
            </div>
        </section>
    }
}
export default connect(state=>({...state.person}),{...action.person})(PersonalRename);