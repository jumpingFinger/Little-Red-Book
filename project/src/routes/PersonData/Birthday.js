import React from 'react';
import {connect} from 'react-redux';
import {Icon,DatePicker} from "antd";
import Header from "../../component/Header";
/*import  "../../static/css/personalData.less";*/
import action from "../../store/action/index";

class Birthday extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
            birth:''
        }
    }
    async handleDone(ev){
        ev.preventDefault();
        if(this.state.birth.length===0){
            this.props.history.goBack();
            return;
        }
        await this.props.reviseBaseInfo({
            type:"birth",
            value:this.state.birth
        });
        this.props.history.goBack();
    }

     async onChange(date, dateString){
       await this.setState({
           birth:dateString
         });
    };
    render(){
        return <section >
            <Header>
                <Icon type="left" className={'icon'} onClick={(ev)=>{
                    ev.preventDefault();
                    this.props.history.goBack();
                }}/>
                <h3 className={'title'}><span>修改出生日期</span></h3>
                <div className={'done'} onClick={this.handleDone.bind(this)}>完成</div>
            </Header>
            <div className={'renameContainer'}>
                <p>出生日期不要瞎填哦,可以让同年龄段的人关注你哦</p>
                <DatePicker
                    onChange={this.onChange.bind(this)}
                    placeholder={"请选择出生日期"}
                    style={{width:"100%"}}
                    size={"large"}
                    autoFocus={true}
                />
            </div>
        </section>
    }
}
export default connect(state=>({...state.person}),{...action.person})(Birthday);